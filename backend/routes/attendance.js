const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, isFacultyOrAdmin } = require("../middleware");
const attendance = require("../controllers/attendance");

router.route("/multiple").post(catchAsync(attendance.markMultiple));

router
  .route("/")
  .get(catchAsync(attendance.readAttendance))
  .post(catchAsync(attendance.markAttendance));

module.exports = router;
