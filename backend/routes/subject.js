const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, validateSubject } = require("../middleware");
const subject = require("../controllers/subject");

router
  .route("/create")
  .post(validateSubject, catchAsync(subject.createSubject));

router
  .route("/:id")
  .get(catchAsync(subject.showSubject))
  .put(validateSubject, catchAsync(subject.updateSubject))
  .delete(catchAsync(subject.deleteSubject));

module.exports = router;
