const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const fs = require("fs");
const { isLoggedIn, isFacultyOrAdmin } = require("../middleware");
const { spawnProcess } = require("../computationalUnit/extractPdf");
const { upload } = require("../computationalUnit/fileupload");
const { Mark } = require("../models/mark");

router.route("/upload").post(
  upload.single("file"),
  catchAsync(async (req, res) => {
    const filePath = req.file.path;
    res.send(filePath);
  })
);

router.route("/cropCoordinates").post(
  catchAsync(async (req, res) => {
    const { coords, pages, name } = req.body;
    const result = await spawnProcess(coords, pages, res);
    res.end();
  })
);

module.exports = router;
