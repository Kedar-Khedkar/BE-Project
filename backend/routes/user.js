const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const user = require("../controllers/user");
const passport = require("passport");
const fs = require("fs");
const { upload } = require("../computationalUnit/fileupload");
const { extractUsers } = require("../computationalUnit/extractExcel");
const {
  validateStudent,
  validateFaculty,
  isLoggedIn,
} = require("../middleware");

router.route("/login").post(
  passport.authenticate("local", {
    failureMessage: true,
  }),
  user.login
);

router.route("/logout").post(isLoggedIn, user.logout);

router
  .route("/studentRegister")
  .post(validateStudent, catchAsync(user.studentRegister));

router
  .route("/facultyRegister")
  .post(validateFaculty, catchAsync(user.facultyRegister));

router.route("/upload").post(
  isLoggedIn,
  upload.single("file"),
  catchAsync(async (req, res) => {
    const uploadPath = req.file.path;
    const result = await extractUsers(uploadPath).then((result) => {
      return result;
    });
    fs.unlink(uploadPath, (err) => {
      if (err) next(err);
    });
    res.send(result);
  })
);

module.exports = router;
