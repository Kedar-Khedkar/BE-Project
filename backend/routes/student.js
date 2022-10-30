const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, isFacultyOrAdmin } = require("../middleware");
const student = require("../controllers/student");
const { upload } = require("../computationalUnit/fileupload");
const { extractSeatnos } = require("../computationalUnit/mapSeatnos");
const fs = require("fs");
const { error } = require("console");

router
  .route("/:id")
  .get(catchAsync(student.getProfileData))
  .put(isLoggedIn, catchAsync(student.updateProfileData))
  .delete(isLoggedIn, isFacultyOrAdmin, catchAsync(student.deleteStudent));

router.route("/mapSeatnos").post(upload.single("file"), (req, res) => {
  extractSeatnos(req.file.path);
  res.send("mapping complete");
  fs.unlink(req.file.path, (error) => {
    if (err) throw error;
  });
});

module.exports = router;
