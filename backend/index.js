const express = require("express");
const app = express();
const path = require("path");
const { upload } = require("./computationalUnit/fileupload");

app.use(express.urlencoded());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
const {Sequelize} = require('sequelize')

const sequelize = require("./utils/database");

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

app.get("/", (req, res) => {
  res.send("We're are ONLINE!!");
});

app.post("/users/upload", upload.single("file"), (req, res) => {
  res.send("Uploaded");
});

app.listen(5000, () => {
  console.log("Listening on Port 5000");
});
