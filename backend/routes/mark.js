const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const fs = require("fs");
const { isLoggedIn, isFacultyOrAdmin } = require("../middleware");
const {
  spawnProcess,
  cleanResult,
} = require("../computationalUnit/extractPdf");
const { convertToImage } = require("../computationalUnit/pdfToImage");
const { upload } = require("../computationalUnit/fileupload");
const { Mark } = require("../models/mark");
const { Student } = require("../models/student");
const { Subject } = require("../models/subject");
const { User } = require("../models/user");

router.route("/upload").post(isLoggedIn, isFacultyOrAdmin,
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

router.route("/cropCoordinates").post(isLoggedIn, isFacultyOrAdmin,
  catchAsync(async (req, res) => {
    const { coords, seatnos, pages, name, image } = req.body;
    const { result, errors } = await cleanResult(
      await spawnProcess(coords, seatnos, pages, name)
    );
    await Mark.bulkCreate(result, {
      updateOnDuplicate: [
        "Insem",
        "Endsem",
        "TOTAL",
        "TW",
        "PR",
        "OR",
        "Tot%",
        "Crd",
        "Grd",
        "GP",
        "CP",
        "P&R",
        "ORD",
      ],
    });
    fs.unlink(name, (err) => {
      if (err) throw err;
      console.log("deleted:", name);
    });
    fs.unlink(`public/temp/${image}`, (err) => {
      if (err) throw err;
      console.log("deleted", "image");
    });

    const report = await Student.findAll({
      attributes: ["examseatno"],
      include: [
        { model: User, attributes: ["fullname"], required: true },
        {
          model: Mark,
          required: true,
          include: { model: Subject, required: true, attributes: ["subName"] },
        },
      ],
    });

    res.send({ status: "success", objects: report, err: errors });
    // res.end();
  })
);

module.exports = router;
