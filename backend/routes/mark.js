const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const fs = require("fs");
const { isLoggedIn, isFacultyOrAdmin } = require("../middleware");
const { extractpdf } = require("../computationalUnit/extractPdf");
const { upload } = require("../computationalUnit/fileupload");

router.route("/upload").post(
    upload.single("file"),
    catchAsync(async(req,res) => {
        const filePath = req.file.path;
        res.send(filePath)
    })
    
)

module.exports = router;