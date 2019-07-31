const mongoose = require('mongoose');

let meetingSchema = new mongoose.Schema({
  name: String,
  description: String,
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date,
    default: Date.now
  },
  location: String,
  website: String,
  public: Boolean,
  adminToken: String,
  creatorIP: String
  //invitees: [String],
  //owner: {
  //  type: mongoose.Schema.Types.ObjectId,
  //  ref: 'User'
  //}
});

meetingSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  }
});

module.exports = mongoose.model('Meeting', meetingSchema);
