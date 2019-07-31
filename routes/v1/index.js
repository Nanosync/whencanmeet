const express = require('express');
const { check, validationResult } = require('express-validator');
const meetingController = require('../../controllers/meeting.controller');
const rateLimit = require('express-rate-limit');

const router = express.Router();

// router.get('/', (req, res, next) => {
//   res.json({ result: "API" });
// });

const modifyLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10
});

const getLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 100
});

router.get('/meetings', getLimiter, meetingController.getMeetings);
router.post('/meeting', [modifyLimiter, meetingController.validate('createMeeting')], meetingController.createMeeting);
router.get('/meeting/:id', [getLimiter, meetingController.validate('getMeeting')], meetingController.getMeeting);
router.get('/meeting/:id/:token', [getLimiter, meetingController.validate('getMeeting')], meetingController.getMeeting);
router.patch('/meeting/:id/:token', [modifyLimiter, meetingController.validate('updateMeeting')], meetingController.updateMeeting);
router.delete('/meeting/:id/:token', [modifyLimiter, meetingController.validate('deleteMeeting')], meetingController.deleteMeeting);

module.exports = router;
