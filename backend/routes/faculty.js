const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, isFacultyOrAdmin } = require("../middleware");
const faculty = require("../controllers/faculty");

router.use(isLoggedIn, isFacultyOrAdmin);

/* Defining the routes for the faculty. */
router
  .route("/all")
  .get(isLoggedIn, isFacultyOrAdmin, catchAsync(faculty.getAllFaculty));
router
  .route("/")
  .get(isLoggedIn, isFacultyOrAdmin, catchAsync(faculty.getClaimedSubjects));

router
  .route("/claimSubjects")
  .post(isLoggedIn, isFacultyOrAdmin, catchAsync(faculty.claimSubjects));

router
  .route("/subject/:id")
  .delete(isLoggedIn, isFacultyOrAdmin, catchAsync(faculty.unclaimSubject));

module.exports = router;
