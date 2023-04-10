const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const {
  isLoggedIn,
  isFacultyOrAdmin,
  validateUser,
  validateStudentProfile,
} = require("../middleware");
const student = require("../controllers/student");
const { upload } = require("../computationalUnit/fileupload");
const { extract_seatno } = require("../computationalUnit/seatnoMapping");
const fs = require("fs");
const { Student } = require("../models/student");
const { User } = require("../models/user");
const { Op } = require("sequelize");

/* Creating a route for the search function in the student controller. */
router
  .route("/search")
  .get(isLoggedIn, isFacultyOrAdmin, catchAsync(student.search));

router
  .route(
    "/:id"
  ) /* Calling the getProfileData function in the student controller. */
  .get(isLoggedIn, catchAsync(student.getProfileData))
  /* Calling the updateProfileData function in the student controller. */
  .put(isLoggedIn, catchAsync(student.updateProfileData))
  .delete(isLoggedIn, isFacultyOrAdmin, catchAsync(student.deleteStudent));

router.route("/mapSeatnos").post(
  upload.single("file"),
  catchAsync(async (req, res) => {
    /* This is a function that extracts the seat numbers from the uploaded file and then deletes the
  file. */
    let errors = [];
    const result = await extract_seatno(req.file.path);
    for (let i = 0; i < result.length; i++) {
      for (let j = 0; j < result[i].length; j++) {
        let user = await User.findOne({
          where: {
            fullname: {
              [Op.substring]: result[i][j].fullname.split(" ")[0],
            },
          },
          attributes: ["id"],
        });
        if (user) {
          await Student.update(
            { examseatno: result[i][j].examseatno },
            {
              where: { [Op.or]: { userId: user.id, prn: result[i][j].prn } },
            }
          );
        } else {
          errors.push(result[i][j]);
        }
      }
    }
    fs.unlink(req.file.path, (error) => {
      if (error) throw error;
    });
    res.send({ status: "success", objects: null, err: errors });
  })
);

module.exports = router;
