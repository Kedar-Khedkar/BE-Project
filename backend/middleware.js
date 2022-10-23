const { studentRegister, facultyRegister } = require("./schemas");
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
