const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const unitTest = require("../controllers/unitTest");
const {
  isLoggedIn,
  isFacultyOrAdmin,
  validateUTquery,
  validateUnitTest,
} = require("../middleware");

router
  .route("/")
  .get(
    isLoggedIn,
    isFacultyOrAdmin,
    validateUTquery,
    catchAsync(unitTest.getOrCreate)
  )
  .put(
    isLoggedIn,
    isFacultyOrAdmin,
    validateUnitTest,
    catchAsync(unitTest.update)
  );

module.exports = router;
