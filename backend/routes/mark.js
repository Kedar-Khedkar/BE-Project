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
        imagePath: `http://localhost:5000/temp/${imageProps.name}`,
        width: imageProps.width,
        height: imageProps.height,
      },
      err: null,
    });
  })
);

router.route("/cropCoordinates").post(
  catchAsync(async (req, res) => {
    const { coords, seatnos, pages, name } = req.body;
    const result = await spawnProcess(coords, seatnos, pages, name);
    // result.forEach(async (student) => {
    //   let id = await Student.findOne({
    //     where: { examseatno: student[0].seatno },
    //   });
    //   student.forEach((subject) => {
    //     subject.StudentUserId = id;
    //     delete subject.seatno;
    //   });
    //   let insertion = await Mark.bulkCreate(student);
    //   console.log(insertion);
    // });
    res.send({ status: "success", objects: result, err: null });
    // res.end();
  })
);

module.exports = router;
