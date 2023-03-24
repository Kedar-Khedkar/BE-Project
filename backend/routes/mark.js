const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const fs = require("fs");
const { isLoggedIn, isFacultyOrAdmin } = require("../middleware");
const { spawnProcess } = require("../computationalUnit/extractPdf");
const { convertToImage } = require("../computationalUnit/pdfToImage");
const { upload } = require("../computationalUnit/fileupload");
const { Mark } = require("../models/mark");
const { Student } = require("../models/student");
const { Subject } = require("../models/subject");

router.route("/upload").post(
  upload.single("file"),
  catchAsync(async (req, res) => {
    const filePath = req.file.path;
    const imageProps = await convertToImage(filePath);
    // console.log(JSON.parse(imageProps));
    res.send({
      status: "success",
      objects: {
        filepath: filePath,
        imagePath: `${imageProps.name}`,
        width: imageProps.width,
        height: imageProps.height,
      },
      err: null,
    });
  })
);

router.route("/cropCoordinates").post(
  catchAsync(async (req, res) => {
    const { coords, seatnos, pages, name, image } = req.body;
    const { result, errors } = await spawnProcess(coords, seatnos, pages, name);
    fs.unlink(name, (err) => {
      if (err) throw err;
      console.log("deleted:", name);
    });
    fs.unlink(`public/temp/${image}`, (err) => {
      if (err) throw err;
      console.log("deleted", "image");
    });
    // result.forEach(async (student) => {
    //   let { userId } = await Student.findOne({
    //     where: { examseatno: student[0].seatno },
    //     attributes: ["userId"],
    //   });
    //   let { SubjectSubCode } = await Subject.findOne({
    //     where: { SubjectSubCode: SubjectSubCode },
    //     attributes: ["SubjectSubCode"],
    //   });
    //   student.forEach((subject) => {
    //     subject.StudentUserId = userId;
    //     subject.SubjectSubCode = SubjectSubCode;
    //     delete subject.seatno;
    //   });
    //   if (SubjectSubCode && userId) {
    //     let insertion = await Mark.bulkCreate(student);
    //   }
    // });
    res.send({ status: "success", objects: result, err: errors });
    // res.end();
  })
);

module.exports = router;
