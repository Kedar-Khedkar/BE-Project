const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const {
  isLoggedIn,
  validateSubject,
  isFacultyOrAdmin,
} = require("../middleware");
const subject = require("../controllers/subject");

router
  .route("/create")
  .post(
    isLoggedIn,
    isFacultyOrAdmin,
    validateSubject,
    catchAsync(subject.createSubject)
  );

router
  .route("/:id")
  .get(catchAsync(subject.showSubject))
  .put(
    isLoggedIn,
    isFacultyOrAdmin,
    validateSubject,
    catchAsync(subject.updateSubject)
  )
  .delete(isLoggedIn, isFacultyOrAdmin, catchAsync(subject.deleteSubject));

module.exports = router;
