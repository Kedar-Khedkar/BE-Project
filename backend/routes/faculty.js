const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, isFacultyOrAdmin } = require("../middleware");
const faculty = require("../controllers/faculty");

router.use(isLoggedIn, isFacultyOrAdmin);

/* Defining the routes for the faculty. */
router.route("/").get(catchAsync(faculty.getClaimedSubjects));

router.route("/claimSubjects").post(catchAsync(faculty.claimSubjects));

router.route("/subject/:id").delete(catchAsync(faculty.unclaimSubject));

module.exports = router;
