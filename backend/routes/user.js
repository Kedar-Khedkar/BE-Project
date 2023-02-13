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
  validateForgetRequest,
  validateResetRequest,
} = require("../middleware");
const { sequelize, Sequelize } = require("../utils/database");
const Op = Sequelize.Op;

/* This is a route for login. It is using passport.js for authentication. */
router.route("/login").post(
  passport.authenticate("local", {
    failureMessage: true,
  }),
  user.login
);

/* This is a route for logout. It is using passport.js for authentication. */
router.route("/logout").post(isLoggedIn, user.logout);

/* This is a route for student registration. It is using `validateStudent` middleware for validation
and `catchAsync` for error handling. */
router
  .route("/studentRegister")
  .post(validateStudent, catchAsync(user.studentRegister));

/* This is a route for faculty registration. It is using `validateFaculty` middleware for validation
and `catchAsync` for error handling. */
router
  .route("/facultyRegister")
  .post(validateFaculty, catchAsync(user.facultyRegister));

/* This is a route for uploading a file. It is using `upload.single("file")` middleware for uploading a
file. */
router.route("/upload").post(
  // isLoggedIn,
  upload.single("file"),
  catchAsync(async (req, res) => {
    /* This handler is used to pass the uploaded files to extractUsers and delete the file using `fs.unlink()` */
    const uploadPath = req.file.path;
    const result = await extractUsers(uploadPath);
    fs.unlink(uploadPath, (err) => {
      if (err) next(err);
      return;
    });
    res.send(result);
  })
);

/* This is a route for forgot password. It is using `validateForgetRequest` middleware for validation
and `catchAsync` for error handling. */
router
  .route("/forgotPassword")
  .post(validateForgetRequest, catchAsync(user.forgotPassword));

/* This is a route for reset password. It is using `validateResetRequest` middleware for validation
and `catchAsync` for error handling. */
router
  .route("/reset-password")
  .post(/*validateResetRequest,*/ catchAsync(user.reset_password));

module.exports = router;
