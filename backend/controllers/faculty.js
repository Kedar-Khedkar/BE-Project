const { Faculty } = require("../models/faculty");

module.exports.getClaimedSubjects = async (req, res) => {
  const facultySubjects = await Faculty.findAll({
    where: { userId: req.user.id },
    include: ["Subject"],
  });
  res.send({ status: "success", data: facultySubjects, err: null });
};

module.exports.claimSubjects = async (req, res) => {
  const { subIds } = req.body;
  const { id } = req.user;
  for (let idx = 0; idx < subIds.length; idx++) {
    let subid = subIds[idx];
    await Faculty.findOrCreate({
      where: { userId: id, SubjectSubCode: subid },
      default: {
        userId: id,
        SubjectSubCode: subid,
      },
    }).catch((err) => {
      console.log(err);
    });
  }
  res.send({ status: "success", data: null, err: null });
};

module.exports.unclaimSubject = async (req, res) => {
  const { id } = req.user;
  const subcode = req.params.id;
  const exists = await Faculty.findOne({
    where: { userId: id, SubjectSubCode: subcode },
  });
  if (!exists) {
    res.send({
      status: "error",
      data: null,
      err: `You don't own subject: ${subcode}`,
    });
    return;
  }
  const result = await Faculty.destroy({
    where: { userId: id, SubjectSubCode: subcode },
  });
  if (result === 1) {
    res.send({ status: "success", data: null, err: null });
  } else res.send({ status: "fail", data: null, err: "Failed to delete." });
};
