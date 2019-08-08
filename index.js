const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
//const morganBody = require('morgan-body');
const mongoose = require('mongoose');

const app = express();
const dev = app.get('env') !== 'production';
const sslRedirect = require('heroku-ssl-redirect');
const PORT = process.env.PORT || 3001;

let whitelist = ['https://whencanmeet.herokuapp.com', 'https://whencanmeet.benedictpak.com'];

// SSL only enabled for production by default
app.use(sslRedirect());

if (dev) {
  whitelist.push('http://localhost:3000');
  app.use(morgan('dev'));
  //morganBody(app);
  mongoose.connect('mongodb://127.0.0.1:27017/whenmeet', { useNewUrlParser: true });
} else {
  app.disable('x-powered-by');
  app.use(morgan('common'));

  app.use(express.static(path.resolve(__dirname, 'client/build')));
  mongoose.connect(process.env.MONGOLAB_URI, { useNewUrlParser: true, dbName: 'whenmeet' });
}

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB connection established successfully');
});

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.enable('trust proxy');

app.use(cors(corsOptions));
app.use(express.json());

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