const {
  studentRegister,
  facultyRegister,
  subjectSchema,
  forgotpassword,
  resetpassword,
  userSchema,
  utSchema,
  studentSchema,
} = require("./schemas");

const { User } = require("./models/user");
const ExpressError = require("./utils/ExpressError");
const { Subject } = require("./models/subject");

/* This is a middleware function that validates the student registration form. */
module.exports.validateStudent = (req, res, next) => {
  const { error } = studentRegister.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

module.exports.validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
    // res.status(400).send({
    //   status: "error",
    //   objects: null,
    //   err: msg
    // })
  } else {
    next();
  }
};

/* This is a middleware function that checks if the user is logged in or not. If the user is not logged
in, it will redirect the user to the login page. */
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "You must be signed in");
    res.status(401).send({
      status: "error",
      err: "You must be signed in",
      data: { redirectLink: "/login" },
    });
  } else {
    console.log(req.user);
    next();
  }
};

/* This is a middleware function that validates the faculty registration form. */
module.exports.validateFaculty = (req, res, next) => {
  const { error } = facultyRegister.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

/* This is a middleware function that validates the forgot password form. */
module.exports.validateForgetRequest = (req, res, next) => {
  console.log(req.body);
  const { error } = forgotpassword.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

/* This is a middleware function that validates the reset password form. */
module.exports.validateResetRequest = (req, res, next) => {
  const { error } = resetpassword.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

/* This is a middleware function that validates the subject form. */
module.exports.validateSubject = (req, res, next) => {
  const { error } = subjectSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

/* This is a middleware function that checks if the user is a faculty or admin. If the user is not a
faculty or admin, it will throw an error. */
module.exports.isFacultyOrAdmin = async (req, res, next) => {
  const currentUser = req.user;
  const user = await User.findOne({
    where: {
      id: currentUser.id,
      fullname: currentUser.username,
    },
  });
  if (user.role !== "student") {
    next();
  } else {
    res.status(403).send({
      status: "error",
      data: null,
      err: "You Don't have the required permissions",
    });
  }
};

/* This is a middleware function that checks if the user is an admin. If the user is not an admin, it
will throw an error. */
module.exports.isAdmin = async (req, res, next) => {
  const currentUser = req.user;
  const user = await User.findOne({
    where: {
      id: currentUser.id,
      fullname: currentUser.username,
    },
  });
  if (user.role === "admin") {
    next();
  } else {
    res.status(403).send({
      status: "error",
      data: null,
      err: "You Don't have the required permissions",
    });
  }
};

module.exports.validateUTquery = async (req, res, next) => {
  const subject = await Subject.findOne({
    where: { subCode: req.query.SubjectSubCode },
    attributes: ["sem"],
  });
  if (subject.sem == req.query.sem) {
    next();
  } else {
    res.status(400).send({
      status: "error",
      objects: null,
      err: "Subject Code and sem do not match Invalid query",
    });
  }
};

module.exports.validateUnitTest = (req, res, next) => {
  const { error } = utSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};
module.exports.validateStudentProfile = async(req, res, next) => {
  console.log(req.body);
  const {error} = studentSchema.validate(req.body);
  if (error){
    const message = error.details.map((el) => el.message).join(",");
    throw new ExpressError(message, 400);
  }
}
