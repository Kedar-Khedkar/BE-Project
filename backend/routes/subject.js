const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const {
  isLoggedIn,
  validateSubject,
  isFacultyOrAdmin,
} = require("../middleware");
const subject = require("../controllers/subject");

/* This is a route for creating a subject. */
router
  .route("/create")
  .post(
    isLoggedIn,
    isFacultyOrAdmin,
    validateSubject,
    catchAsync(subject.createSubject)
  );

router.route("/all").get(catchAsync(subject.getAll));

/* This is a route for updating and deleting a subject. */
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
