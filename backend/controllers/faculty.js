const { Faculty } = require("../models/faculty");

module.exports.getClaimedSubjects =
  /* A function that is called when a user makes a get request to the
route api/faculty/. It finds all the subjects that the
user has claimed and sends them back to the user. */
  async (req, res) => {
    const facultySubjects = await Faculty.findAll({
      where: { userId: req.user.id },
      include: ["Subject"],
    });
    res.send({ status: "success", objects: facultySubjects, err: null });
  };

module.exports.claimSubjects =
  /* A function that is called when a user makes a post request to the
route api/faculty/claim. It takes in the subject ids that the user
wants to claim and adds them to the database. */
  async (req, res) => {
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
    res.send({ status: "success", objects: null, err: null });
  };

module.exports.unclaimSubject =
  /* This function is called when a user makes a delete request to the
route api/faculty/unclaim/:id. It takes in the subject id that the
user wants to unclaim and removes the relation from database */
  async (req, res) => {
    const { id } = req.user;
    const subcode = req.params.id;
    const exists = await Faculty.findOne({
      where: { userId: id, SubjectSubCode: subcode },
    });
    if (!exists) {
      res.send({
        status: "error",
        objects: null,
        err: `You don't own subject: ${subcode}`,
      });
      return;
    }
    const result = await Faculty.destroy({
      where: { userId: id, SubjectSubCode: subcode },
    });
    if (result === 1) {
      res.send({ status: "success", objects: null, err: null });
    } else
      res.send({ status: "fail", objects: null, err: "Failed to delete." });
  };
