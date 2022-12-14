var multer = require("multer");
var path = require("path");

/* Creating a storage object that will be used by multer to store the file. */
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

var upload = multer({ storage: storage });
module.exports = { upload };
