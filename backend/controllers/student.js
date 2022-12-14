const { Student } = require("../models/student");
const { User } = require("../models/user");

module.exports.getProfileData = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ where: { id: id } });
  if (user == undefined) {
    res.send({ status: "error", data: null, err: "No such account" });
  } else {
    let { role } = user;
    if (role !== "student") {
      res.send({
        status: "fail",
        data: null,
        err: `user: ${id} is not a student`,
      });
    } else {
      const student = await Student.findOrCreate({
        where: { userId: id },
        default: { userId: id },
        include: { model: User, attributes: ["email", "fullname"] },
      });
      const dataRequired =
        student[0].rollno === -1 || student[0].prn === "required" || student[1];
      res.send({
        status: "success",
        data: { isFirstLogin: dataRequired, student: student[0] },
        err: null,
      });
    }
  }
};

module.exports.updateProfileData = async (req, res) => {
  const { role } = await User.findOne({
    attributes: ["role"],
    where: {
      id: req.params.id,
    },
  });
  if (!role) {
    res.send({ status: "error", data: null, err: "No such account" });
  }
  if (role !== "student") {
    res.status(403).send({
      status: "fail",
      data: null,
      err: `userId: ${req.params.id} is not a student.`,
    });
  } else {
    const result = await Student.update(
      { ...req.body.student },
      { where: { userId: req.params.id } }
    );
    res.redirect(`/student/${req.params.id}`);
  }
};

module.exports.deleteStudent = async (req, res) => {
  const exists = await Student.findOne({
    where: { userId: req.params.id },
  });
  if (!exists) {
    res.send({ status: "error", data: null, err: "No such account" });
    return;
  }
  const result = await Student.destroy({
    where: { userId: req.params.id },
  });
  if (result === 1) res.send({ status: "success", data: null, err: null });
  else
    res
      .status(500)
      .send({ status: "error", data: null, err: "Something went wrong" });
};

module.exports.search = async (req, res) => {
  const filter = req.query;
  const students = await Student.findAll({
    where: {
      curryear: Number(filter.curryear),
      curr_sem: Number(filter.curr_sem),
    },
    attributes: ["rollno", "userId"],
    include: {
      model: User,
      attributes: ["fullname"],
    },
  });
  res.send({ status: "success", data: students, err: null });
};
