const { Student } = require("../models/student");
const { User } = require("../models/user");

module.exports.getProfileData = async (req, res) => {
  const { id } = req.params;
  const student = await Student.findOrCreate({
    where: { userId: id },
    default: { userId: id },
  });
  const dataRequired =
    student[0].rollno === -1 || student[0].prn === "required" || student[1];
  res.send({ isFirstLogin: dataRequired, data: student[0] });
};

module.exports.updateProfileData = async (req, res) => {
  const { role } = await User.findOne({
    attributes: ["role"],
    where: {
      id: req.params.id,
    },
  });
  if (role !== "student") {
    res.status(403).send(`userId: ${req.params.id} is not a student.`);
  } else {
    const result = await Student.update(
      { ...req.body.student },
      { where: { userId: req.params.id } }
    );
    res.redirect(`/student/${req.params.id}`);
  }
};

module.exports.deleteStudent = async (req, res) => {
  const result = await Student.destroy({
    where: { userId: req.params.id },
  });
  if (result === 1) res.send("Deleted");
  else res.status(500).send("Something went wrong");
};
