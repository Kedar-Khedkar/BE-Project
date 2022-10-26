const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, isFacultyOrAdmin } = require("../middleware");
const student = require("../controllers/student");

router
  .route("/:id")
  .get(catchAsync(student.getProfileData))
  .put(isLoggedIn, catchAsync(student.updateProfileData))
  .delete(isLoggedIn, isFacultyOrAdmin, catchAsync(student.deleteStudent));

module.exports = router;
