const { Faculty } = require("../models/faculty");

module.exports.getClaimedSubjects = async (req, res) => {
  const facultySubjects = await Faculty.findAll({
    where: { userId: req.user.id },
    include: ["Subject"],
  });
  res.send(facultySubjects);
};

module.exports.claimSubjects = async (req, res) => {
  const { subIds } = req.body;
  const { id } = req.user;
  const err = subIds.forEach(async (subid) => {
    const result = await Faculty.findOrCreate({
      where: { userId: id, SubjectSubCode: subid },
      default: {
        userId: id,
        SubjectSubCode: subid,
      },
    }).catch((err) => {
      return { err: true };
    });
  });
  res.send("success");
};

module.exports.unclaimSubject = async (req, res) => {
  const { id } = req.user;
  const subcode = req.params.id;
  const result = await Faculty.destroy({
    where: { userId: id, SubjectSubCode: subcode },
  });
  if (result === 1) {
    res.send("success");
  } else res.send("Failed to delete");
};
