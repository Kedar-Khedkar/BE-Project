const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const { sendMail } = require("../utils/email");
const { resetPassword } = require("../models/resetPassword");
const crypto = require("crypto");
const { sequelize, Sequelize } = require("../utils/database");
const Op = Sequelize.Op;

const genPassword = (len = 8) => {
  return uuid.v4().slice(0, len);
};

const register = async (user, password) => {
  user.passSalt = bcrypt.genSaltSync(10);
  user.passHash = bcrypt.hashSync(password, user.passSalt);
  const result = await User.create(user);
  return result;
};

const login = (req, res) => {
  // #swagger.tags = ['user']

  const redirectUrl = req.session.returnTo || "/dashboard";
  delete req.session.returnTo;
  res.send({
    status: "success",
    objects: {
      redirectLink: redirectUrl,
      user: {
        id: req.user.id,
        fullname: req.user.fullname,
        role: req.user.role,
      },
    },
    err: null,
  });
};

const logout = (req, res) => {
  // #swagger.tags = ['user']
  req.logout((err) => {
    if (err) throw err;
  });
  res.send({
    status: "success",
    objects: null,
    err: null,
  });
};

const studentRegister = async (req, res) => {
  // #swagger.tags = ['user']

  const { user } = req.body;
  const prevUser = await User.findOne({
    where: { email: user.email },
    attributes: ["email"],
  });
  if (prevUser) {
    res.send({
      status: "fail",
      objects: null,
      err: `User with email: ${user.email}, already exists.`,
    });
  } else {
    //   let password = genPassword();
    let password = "password";
    await register(user, password);
    //   sendMail(
    //     user.email,
    //     "Account Details",
    //     `Hello ${user.fullname},\n Your password is ${password}, use it to login and fill in the required student details \n Thank You\n NOTE: This is email is generated by DDMS`
    //   );
    res.send({ status: "success", objects: null, err: null });
  }
};

const facultyRegister = async (req, res) => {
  const { user } = req.body;
  // let password = genPassword();
  const prevUser = await User.findOne({
    where: { email: user.email },
    attributes: ["email"],
  });
  if (prevUser) {
    res.send({
      status: "fail",
      objects: null,
      err: `User with email: ${user.email}, already exists.`,
    });
  } else {
    let password = "password";
    await register(user, password);
    // sendMail(
    //   user.email,
    //   "Account Details",
    //   `Hello ${user.fullname},\n Your password is ${password}, use it to login and fill in the required details \n Thank You\n NOTE: This is email is generated by DDMS`
    // );
    res.send({ status: "success", objects: null, err: null });
  }
};

const forgotPassword = async function (req, res, next) {
  const user = await User.findOne({
    where: { email: req.body.email },
    attributes: ["email"],
  });

  if (user == null) {
    return res.json({
      status: "fail",
      objects: null,
      err: "No such user found",
    });
  } else {
    const { email } = user;
    await resetPassword.update(
      {
        used: 1,
      },
      {
        where: {
          email: email,
        },
      }
    );
    const randomSalt = crypto.randomBytes(64).toString("base64");
    const expireDate = new Date(new Date().getTime() + 60 * 60 * 1000);
    const { token } = await resetPassword.create({
      email: req.body.email,
      expiration: expireDate,
      token: randomSalt,
      used: 0,
    });
    console.log(token);
    sendMail(
      email,
      "Password Reset",
      "Click this link: http://localhost:5000/users/reset-password?token=" +
        encodeURIComponent(token) +
        "&email=" +
        req.body.email
    );
    return res.json({
      status: "success",
      objects: { token: token },
      err: null,
    });
  }
};

const reset_password = async function (req, res, next) {
  if (req.body.password1 != req.body.password2) {
    return res.json({
      status: "fail",
      objects: null,
      err: "passwords do not match. please try again",
    });
  }
  const record = await resetPassword.findOne({
    where: {
      email: req.body.email,
      expiration: { [Op.gt]: Sequelize.fn("CURDATE") },
      token: req.body.token,
      used: 0,
    },
  });

  if (record == null) {
    return res.json({
      status: "error",
      objects: null,
      err: "Token not found. Please try again",
    });
  }
  const updaterecord = await resetPassword.update(
    {
      used: 1,
    },
    {
      where: {
        email: req.body.email,
      },
    }
  );

  bcrypt.genSalt(10, function (err, salt) {
    if (err) throw err;
    bcrypt.hash(req.body.password1, salt, async function (err, hash) {
      if (err) throw err;
      await User.update(
        {
          passHash: hash,
          passSalt: salt,
        },
        {
          where: {
            email: req.body.email,
          },
        }
      );
    });
  });
  res.send({
    status: "success",
    objects: { redirectLink: "/login" },
    err: null,
  });
};

module.exports = {
  genPassword,
  register,
  login,
  logout,
  studentRegister,
  facultyRegister,
  reset_password,
  forgotPassword,
};
