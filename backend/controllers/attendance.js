const { Attendance } = require("../models/attendance");
const { Student } = require("../models/student");
const { User } = require("../models/user");
const { Subject } = require("../models/subject");
const { Op } = require("sequelize");

module.exports.readAttendance = async (req, res) => {
  const { filters } = req.body;
  const result = await Attendance.findAll({
    where: {
      "$Subject.subCode$": `${filters.subject}`,
      createdAt: {
        [Op.between]: [`${filters.from}`, `${filters.to}`],
      },
    },
    attributes: ["presentee", "createdAt"],
    order: ["createdAt"],
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
  res.send(result);
};

module.exports.markAttendance = async (req, res) => {
  const { rollno, presentee, subCode } = req.body;
  console.log(rollno, presentee, subCode);
  const { userId } = await Student.findOne({
    attributes: ["userId"],
    where: { rollno: rollno },
  });
  console.log(userId);
  const result = await Attendance.create({
    presentee: presentee,
    StudentUserId: userId,
    SubjectSubCode: subCode,
  });
  res.send(result);
};