const { Subject } = require("../models/subject");
const { where } = require("sequelize");

module.exports.createSubject = async (req, res) => {
  const { subject } = req.body;
  const prevSubject = await Subject.findOne({
    where: { subCode: subject.subCode },
    attrubutes: ["subcode"],
  });
  if (prevSubject) {
    res.send(`Subject with subject code: ${subject.subCode}, already exists`);
  } else {
    await Subject.create(subject)
      .then((result) => {
        res.redirect(`/subjects/${subject.subCode}`);
      })
      .catch((err) => {
        res.status(500).send("Something went wrong");
      });
  }
};

module.exports.showSubject = async (req, res) => {
  const { id } = req.params;
  const subject = await Subject.findOne({ where: { subCode: id } });
  res.send(subject);
};

module.exports.updateSubject = async (req, res) => {
  const { id } = req.params;
  await Subject.update({ ...req.body.subject }, { where: { subCode: id } })
    .then((result) => {
      res.redirect(`/subjects/${id}`);
    })
    .catch((err) => {
      res.status(500).send("Something went wrong");
    });
};

module.exports.deleteSubject = async (req, res) => {
  const { id } = req.params;
  const result = await Subject.destroy({
    where: {
      subCode: id,
    },
  });
  if (result === 1) res.send("Deleted");
  else res.status(500).send("Something went wrong");
};
