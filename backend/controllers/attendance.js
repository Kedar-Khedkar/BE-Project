const { Attendance } = require("../models/attendance");
const { Student } = require("../models/student");
const { User } = require("../models/user");
const { Subject } = require("../models/subject");
const { Op, Sequelize } = require("sequelize");
const { sequelize } = require("../utils/database");

module.exports.readAttendance =
  /* A function to find all the attendance records between two dates. */
  async (req, res) => {
    const { filters } = req.body;
    console.log(req.body);
    const result = await Attendance.findAll({
      where: {
        "$Subject.subCode$": `${filters.subject}`,
        createdAt: {
          [Op.between]: [`${filters.from}`, `${filters.to}`],
        },
      },
      attributes: ["presentee", "createdAt"],
      order: ["createdAt"],
      /* A way to include the data from other tables in the result. */
      include: [
        {
          model: Student,
          required: true,
          attributes: ["rollno"],
          order: ["rollno"],
          include: {
            model: User,
            required: true,
            attributes: ["fullname"],
          },
        },
        {
          model: Subject,
          required: true,
          attributes: ["subName"],
        },
      ],
    });
    res.send({ status: "success", objects: result, err: null });
  };

module.exports.markAttendance =
  /* A function that is called when a request is made to the server at
the url `/api/attendance/mark`. It checks if the student exists, and marks the attendance for today's date in the database */
  async (req, res) => {
    const { rollno, presentee, subCode } = req.body;
    console.log(rollno, presentee, subCode);
    const { userId } = await Student.findOne({
      attributes: ["userId"],
      where: { rollno: rollno },
    });
    if (!userId) {
      res.send({ status: "error", objects: null, err: "No such student" });
    }
    const result = await Attendance.create({
      presentee: presentee,
      StudentUserId: userId,
      SubjectSubCode: subCode,
    });
    res.send({ status: "success", objects: result, err: null });
  };

module.exports.markMultiple =
  /* A function that is called when a request is made to the server at the
url `/api/attendance/markMultiple`. It takes a list of attendance
records and adds them to the database. */
  async (req, res) => {
    const attendList = req.body;
    const result = await Attendance.bulkCreate(attendList);
    res.send(result);
  };

module.exports.statistics = async (req, res) => {
  const stats = {};
  stats.deptAvg = await Attendance.findAll({
    attributes: [[Sequelize.literal("AVG(presentee)*100"), "deptAvg"]],
  });
  stats.dailyAvg = await Attendance.findAll({
    attributes: [
      [Sequelize.literal("(AVG(presentee)*100)"), "avg"],
      [sequelize.fn("DATE", sequelize.col("createdAt")), "date"],
    ],
    group: ["date"],
  });

  res.send({ status: "success", objects: stats, err: null });
};

module.exports.studStats = async (req, res) => {
  const user = req.user;
  if (user.role !== "student") {
    res.send({
      status: "fail",
      objects: null,
      err: `${user.id} is not a student`,
    });
  } else {
    const data = {};
    data.totalAvg = await Attendance.findAll({
      attributes: [[Sequelize.literal("AVG(presentee)*100"), "avg"]],
      where: { StudentUserId: user.id },
    });
    data.subwise = await Attendance.findAll({
      attributes: [
        [Sequelize.literal("AVG(presentee)*100"), "avg"],
        "SubjectSubCode",
      ],
      where: { StudentUserId: user.id },
      group: ["SubjectSubCode"],
    });
    res.send({ status: "success", objects: data, err: null });
  }
};
