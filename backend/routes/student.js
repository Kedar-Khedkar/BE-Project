const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, isFacultyOrAdmin } = require("../middleware");
const student = require("../controllers/student");
const { upload } = require("../computationalUnit/fileupload");
// const { extractSeatnos } = require("../computationalUnit/mapSeatnos");
const fs = require("fs");

/* Creating a route for the search function in the student controller. */
router.route("/search").get(student.search);

router
  .route(
    "/:id"
  ) /* Calling the getProfileData function in the student controller. */
  .get(catchAsync(student.getProfileData))
  /* Calling the updateProfileData function in the student controller. */
  .put(isLoggedIn, catchAsync(student.updateProfileData))
  .delete(isLoggedIn, isFacultyOrAdmin, catchAsync(student.deleteStudent));

router.route("/mapSeatnos").post(upload.single("file"), (req, res) => {
  /* This is a function that extracts the seat numbers from the uploaded file and then deletes the
  file. */
  extractSeatnos(req.file.path);
  res.send("mapping complete");
  fs.unlink(req.file.path, (error) => {
    if (err) throw error;
  });
});

module.exports = router;
