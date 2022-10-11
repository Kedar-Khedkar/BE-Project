const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");
const fs = require("fs");
const ExpressError = require("./utils/ExpressError");

const { upload } = require("./computationalUnit/fileupload");
const { extractUsers } = require("./computationalUnit/extractExcel");
const { sequelize, Sequelize } = require("./utils/database");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

morgan("dev");

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
sequelize.sync({ force: true });

app.get("/", (req, res) => {
  res.send("We're are ONLINE!!");
});

app.post("/users/upload", upload.single("file"), async (req, res) => {
  const uploadPath = req.file.path;
  await extractUsers(uploadPath);
  res.send("Added users successfully");
  fs.unlink(uploadPath);
});

app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) {
    err.message = "Something Went Wrong!";
  }
  res.status(statusCode).render("err", { err });
});

app.listen(5000, () => {
  console.log("Listening on Port 5000");
});
