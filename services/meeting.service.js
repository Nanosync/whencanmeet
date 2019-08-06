const crypto = require('crypto');
const mongoose = require('mongoose');
const Meeting = require('../models/meeting.model');

const createMeeting = async function(data) {
  const token = crypto.randomBytes(20).toString('hex');
  let meeting = new Meeting({ ...data, adminToken: token });
  
  return await meeting.save();
}

const getMeeting = async function(id, token) {
  const meeting = await Meeting.findById(id);

  if (!meeting) {
    throw new Error("Meeting does not exist.");
  }

  if (token && token === meeting.adminToken) {
    return meeting;
  }

  meeting.adminToken = undefined; // remove from json
  meeting.creatorIP = undefined;
  return meeting;
}

const getMeetings = async function(id, token) {
  const meeting = await Meeting
    .find({ "public": true }, { "adminToken": 0, "creatorIP": 0 })
    .sort({ "startDate": 1 });

  if (!meeting) {
    throw new Error("No meetings available.");
  }

  return meeting;
}

const updateMeeting = async function(id, token, fieldsToUpdate) {
  const meeting = await Meeting.findById(id);
  console.log(meeting);

  if (!meeting) {
    throw new Error("Meeting does not exist.");
  }

  if (token !== meeting.adminToken) {
    throw new Error("Invalid token.");
  }

  return await Meeting
    .findOneAndUpdate(
      { "_id": id },
      fieldsToUpdate,
      { new: true } // returns the new document
    );
}

const deleteMeeting = async function(id, token) {
  const meeting = await Meeting.findById(id);

  if (!meeting) {
    throw new Error("Meeting does not exist.");
  }

  if (token !== meeting.adminToken) {
    throw new Error("Invalid token.");
  }

  return await Meeting.findByIdAndDelete(id);
}

module.exports = {
  createMeeting,
  getMeeting,
  getMeetings,
  updateMeeting,
  deleteMeeting
};
