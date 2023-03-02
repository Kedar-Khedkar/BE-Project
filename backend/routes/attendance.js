const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, isFacultyOrAdmin } = require("../middleware");
const attendance = require("../controllers/attendance");

router.route("/multiple").post(catchAsync(attendance.markMultiple));

router
  .route("/")
  .post(catchAsync(attendance.readAttendance))
  .post(catchAsync(attendance.markAttendance));

router.route("/stats").post(catchAsync(attendance.statistics));
router.route("/stud-stats").get(catchAsync(attendance.studStats));

module.exports = router;
