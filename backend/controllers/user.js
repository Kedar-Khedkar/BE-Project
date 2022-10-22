const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const { sendMail } = require("../utils/email");

const genPassword = (len = 8) => {
  return uuid.v4().slice(0, len);
};

const register = (user, password) => {
  return bcrypt.genSalt(10, function (err, salt) {
    if (err) throw err;
    return bcrypt.hash(password, salt, async function (err, hash) {
      if (err) throw err;
      user.passHash = hash;
      user.passSalt = salt;
      return await User.create(user).catch((error) => {
        return error.parent.sqlmessage;
      });
    });
  });
};

const login = (req, res) => {
  res.send(req.user);
};

const logout = (req, res) => {
  req.logout((err) => {
    if (err) throw err;
  });
  res.send("LoggedOut");
};

const studentRegister = async (req, res) => {
  const { user } = req.body;
  //   let password = genPassword();
  let password = "password";
  await register(user, password);
  //   sendMail(
  //     user.email,
  //     "Account Details",
  //     `Hello ${user.fullname},\n Your password is ${password}, use it to login and fill in the required student details \n Thank You\n NOTE: This is email is generated by DDMS`
  //   );
  res.send("Student added successfully!");
};

const facultyRegister = async (req, res) => {
  const { user } = req.body;
  let password = genPassword();
  await register(user, password);
  sendMail(
    user.email,
    "Account Details",
    `Hello ${user.fullname},\n Your password is ${password}, use it to login and fill in the required details \n Thank You\n NOTE: This is email is generated by DDMS`
  );
  res.send("Faculty added successfully!");
};

module.exports = {
  genPassword,
  register,
  login,
  logout,
  studentRegister,
  facultyRegister,
};