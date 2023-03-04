const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, isFacultyOrAdmin } = require("../middleware");
const attendance = require("../controllers/attendance");

router
  .route("/multiple")
  .post(isLoggedIn, isFacultyOrAdmin, catchAsync(attendance.markMultiple));

router
  .route("/")
  .post(isLoggedIn, isFacultyOrAdmin, catchAsync(attendance.readAttendance))
  .put(isLoggedIn, isFacultyOrAdmin, catchAsync(attendance.editAttendance));

router
  .route("/stats")
  .post(isLoggedIn, isFacultyOrAdmin, catchAsync(attendance.statistics));
router.route("/stud-stats").get(isLoggedIn, catchAsync(attendance.studStats));

module.exports = router;
