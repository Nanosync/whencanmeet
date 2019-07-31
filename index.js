const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const morganBody = require('morgan-body');
const mongoose = require('mongoose');

const app = express();
const dev = app.get('env') !== 'production';
const PORT = process.env.PORT || 3001;

if (!dev) {
  app.disable('x-powered-by');
  app.use(morgan('common'));

  app.use(express.static(path.resolve(__dirname, 'client/build')));
} else {
  app.use(morgan('dev'));
  //morganBody(app);
}

app.enable('trust proxy');

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/whenmeet', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB connection established successfully');
});

// Simple middleware for IP logging
app.use(function(req, res, next) {
  req.clientIP = (req.headers['x-forwarded-for'] || req.connection.remoteAddress || '').split(',')[0].trim();
  next();
});

app.use('/api', require('./routes'));

// For any other requests
app.get('*', (req, res) =>{
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

module.exports = app;