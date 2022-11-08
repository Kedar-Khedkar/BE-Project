const {
  studentRegister,
  facultyRegister,
  subjectSchema,
  forgotpassword,
  resetpassword,
} = require("./schemas");

const { User } = require("./models/user");

const ExpressError = require("./utils/ExpressError");
module.exports.validateStudent = (req, res, next) => {
  const { error } = studentRegister.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "You must be signed in");
    res
      .status(401)
      .send({ error: "You must be signed in", redirectLink: "/login" });
  } else {
    console.log(req.user);
    next();
  }
};

module.exports.validateFaculty = (req, res, next) => {
  const { error } = facultyRegister.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

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

module.exports.validateResetRequest = (req, res, next) => {
  const { error } = resetpassword.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

module.exports.validateSubject = (req, res, next) => {
  const { error } = subjectSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

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
    res.status(403).send({ error: "You Don't have the required permissions" });
  }
};

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
    res.status(403).send({ error: "You Don't have the required permissions" });
  }
};
