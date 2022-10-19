const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");
const fs = require("fs");
const cors = require("cors")
// const session = require("express-session");
const ExpressError = require("./utils/ExpressError");
const catchAsync = require("./utils/catchAsync");

const { upload } = require("./computationalUnit/fileupload");
const { extractUsers } = require("./computationalUnit/extractExcel");
const { sequelize, Sequelize } = require("./utils/database");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

app.use(express.static(path.join(__dirname, "public")));

app.use(morgan("dev"));

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
sequelize.sync({ force: true });

const { validateStudent, validateFaculty } = require("./middleware");
const { User } = require("./models/user");
app.post(
  "/users/studentRegister",
  validateStudent,
  catchAsync(async (req, res) => {
    const { user } = req.body;
    await User.create(user);
    res.send("Student added successfully!");
  })
);

app.post(
  "/users/facultyRegister",
  validateFaculty,
  catchAsync(async (req, res) => {
    const { user } = req.body;
    await User.create(user);
    res.send("Faculty added successfully!");
  })
);

app.post(
  "/users/upload",
  upload.single("file"),
  catchAsync(async (req, res) => {
    const uploadPath = req.file.path;
    const result = await extractUsers(uploadPath).then((result) => {
      return result;
    });
    fs.unlink(uploadPath, (err) => {
      if (err) next(err);
    });
    res.send(result);
  })
);

app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (err.message == undefined) {
    err.message = "Something Went Wrong!";
  }
  res.status(statusCode).send(err.message);
});

app.listen(5000, () => {
  console.log("Listening on Port 5000");
});
