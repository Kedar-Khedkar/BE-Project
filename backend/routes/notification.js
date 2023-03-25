// routes/sms.js
const express = require('express');
const router = express.Router();
const { sendSMSToStudent } = require('../controllers/notification');

router.post('/sms', sendSMSToStudent);

module.exports = router;
