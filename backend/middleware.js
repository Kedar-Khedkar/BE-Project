const {
  studentRegister,
  facultyRegister,
  subjectSchema,
  forgotpassword,
  resetpassword,
} = require("./schemas");

const { User } = require("./models/user");
const ExpressError = require("./utils/ExpressError");

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

m; /* This is a middleware function that validates the reset password form. */
odule.exports.validateResetRequest = (req, res, next) => {
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
