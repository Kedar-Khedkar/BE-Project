const { Student } = require("../models/student");
const { User } = require("../models/user");

module.exports.getProfileData = async (
  req,
  res /* This is a function that is called when a user
tries to access the profile page. It checks if
the user is a student and if it is, it returns
the student data. */
) => {
  const { id } = req.params;
  const user = await User.findOne({ where: { id: id } });
  if (user == undefined) {
    res.send({ status: "error", objects: null, err: "No such account" });
  } else {
    let { role } = user;
    if (role !== "student") {
      res.send({
        status: "fail",
        objects: null,
        err: `user: ${id} is not a student`,
      });
    } else {
      const student = await Student.findOrCreate({
        where: { userId: id },
        default: { userId: id },
        /* A way to include the data of another table in the response. */
        include: { model: User, attributes: ["email", "fullname"] },
      });
      /* This is a way to check if the student has entered all the required data. If not `isFirstLogin` is set */
      const dataRequired =
        student[0].rollno === -1 || student[0].prn === "required" || student[1];
      res.send({
        status: "success",
        objects: { isFirstLogin: dataRequired, student: student[0] },
        err: null,
      });
    }
  }
};

module.exports.updateProfileData =
  /* This is a function that is called when a user tries to update
his/her profile. It checks if the user is a student and if it is,
it updates the student data. */
  async (req, res) => {
    const { role } = await User.findOne({
      attributes: ["role"],
      where: {
        id: req.params.id,
      },
    });
    if (!role) {
      res.send({ status: "error", objects: null, err: "No such account" });
    }
    if (role !== "student") {
      res.status(403).send({
        status: "fail",
        objects: null,
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

module.exports.deleteStudent =
  /* This is a function that is called when a user tries to delete his/her
account. It checks if the user is a student and if it is, it deletes
the student data. */
  async (req, res) => {
    const exists = await Student.findOne({
      where: { userId: req.params.id },
    });
    if (!exists) {
      res.send({ status: "error", objects: null, err: "No such account" });
      return;
    }
    const result = await Student.destroy({
      where: { userId: req.params.id },
    });
    if (result === 1) res.send({ status: "success", objects: null, err: null });
    else
      res
        .status(500)
        .send({ status: "error", objects: null, err: "Something went wrong" });
  };

module.exports.search =
  /* This is a function that is called when a user tries to search for students.
It checks if the user provided any filters and retrieves the data accordingy. */
  async (req, res) => {
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
    res.send({ status: "success", objects: students, err: null });
  };
