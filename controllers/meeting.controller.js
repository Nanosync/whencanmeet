const { body, param, validationResult } = require('express-validator');
const meetingService = require('../services/meeting.service');

const validate = (method) => {
  switch(method) {
    case 'createMeeting':
      return [
        body('name').exists().isLength({ min: 3, max: 128 }).trim().escape(),
        body('description').exists().isLength({ min: 3, max: 1024 }).trim().escape(),
        body('startDate').exists().isISO8601(),
        body('endDate').exists().isISO8601(),
        body('location').exists().trim().escape(),
        body('website').exists().trim().isURL(),
        body('public').exists().isBoolean()
      ];
    case 'getMeeting':
      return [
        param('id').exists().isMongoId(),
        param('token').optional().isAlphanumeric().trim().escape()
      ];
    case 'updateMeeting':
      return [
        param('id').exists().isMongoId(),
        param('token').exists().isAlphanumeric().trim().escape(),
        body('name').exists().isLength({ min: 3, max: 128 }).trim().escape(),
        body('description').exists().isLength({ min: 3, max: 1024 }).trim().escape(),
        body('startDate').exists().isISO8601(),
        body('endDate').exists().isISO8601(),
        body('location').exists().trim().escape(),
        body('website').exists().trim().isURL(),
        body('public').exists().isBoolean()
      ];
    case 'deleteMeeting':
      return [
        param('id').exists().isMongoId(),
        param('token').exists().isAlphanumeric().trim().escape()
      ];
    default:
      return;
  }
}

const getMeetings = async function (req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ "id": 0, "error_message": "Invalid request" });
    return;
  }

  await meetingService.getMeetings()
    .then(meeting => res.status(200).json(meeting))
    .catch(err => {
      console.log(err);
      res.status(404).json({ "id": 0, "error_message": err.message });
    });
}

const createMeeting = async function (req, res, next) {
  // Validate request parameters, queries using express-validator
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }

  req.body.creatorIP = req.clientIP;
  req.body.createdDate = Date.now();

  await meetingService.createMeeting(req.body)
    .then(meeting => res.status(200).json(meeting))
    .catch(err => {
      console.log(err);
      res.status(400).json({ "id": id, "error_message": "Failed to add meeting." });
    });
}

const getMeeting = async function (req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ "id": req.params.id, "error_message": "Invalid code" });
    //res.status(422).json({ errors: errors.array() });
    return;
  }
  
  const { id, token } = req.params;
  await meetingService.getMeeting(id, token)
    .then(meeting => res.status(200).json(meeting))
    .catch(err => {
      console.log(err);
      res.status(404).json({ "id": id, "error_message": err.message });
    });
}

const updateMeeting = async function (req, res, next) {
  // Validate request parameters, queries using express-validator
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }

  const { id, token } = req.params;
  req.body.creatorIP = req.clientIP;
  req.body.createdDate = undefined; // don't change this field
  
  await meetingService.updateMeeting(id, token, req.body)
    .then(meeting => res.status(200).json(meeting))
    .catch(err => {
      console.log(err);
      res.status(400).json({ "id": id, "error_message": "Failed to update meeting." });
    });
}

const deleteMeeting = async function (req, res, next) {
  // Validate request parameters, queries using express-validator
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }

  const { id, token } = req.params;
  await meetingService.deleteMeeting(id, token)
    .then(meeting => res.status(200).json({ "id": id, "message": "Meeting deleted successfully" }))
    .catch(err => {
      res.status(400).json({ "id": id, "error_message": err.message });
    });
}

module.exports = {
  createMeeting,
  getMeeting,
  updateMeeting,
  deleteMeeting,
  getMeetings,
  validate
};