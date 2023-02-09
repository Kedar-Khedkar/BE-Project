const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, isFacultyOrAdmin } = require("../middleware");
const { extractpdf } = require("../computationalUnit/extractPdf");

router.route("/").get((req, res)=>{
    extractpdf("/home/mitali/Desktop/BE-Project/backend/public/uploads/CEGP012620_S.E.(2019 PAT.)(INFORMATIOM TECHNOLOGY) (1).pdf")
})

module.exports = router;