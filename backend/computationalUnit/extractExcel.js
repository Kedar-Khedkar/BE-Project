const Excel = require("exceljs");
const { User } = require("../models/user");
const { userUploadSchema } = require("../validations/user");
const controller = require("../controllers/user");
const { sendMail } = require("../utils/email");

const genResult = async (successCount, lastprocessed, errorValues) => {
  let result = {};
  if (errorValues.length == 0) {
    result.status = "success";
    result.objects = {
      msg: `${successCount} users successfully added out of ${lastprocessed} users.`,
    };
    result.err = null;
  } else {
    result.status = "fail";
    result.objects = errorValues;
    result.err = `${successCount} users successfully added out of ${lastprocessed} users.`;
  }
  return result;
};

const validateUser =
  /* Validating the user object. */
  async (user) => {
    const { error } = userUploadSchema.validate(user);
    if (error) {
      user.errmsg = error.details[0].message;
      return user;
    }
    /* Checking if the user already exists in the database. */
    const prevUser = await User.findOne({ where: { email: user.email } });
    if (prevUser) {
      user.errmsg = "User already exists";
      return user;
    }
    return null;
  };

const informUser =
  /* Sending an email to the user with the password. */
  async (user) => {
    // sendMail(
    //       //   user.email,
    //       //   "Account Details",
    //       //   `Hello ${user.fullname},\n Your password is ${password}, use it to login and fill in the required student details \n Thank You\n NOTE: This is email is generated by DDMS`
    //       // );
    console.log(
      "Mail functionality has been disabled for development (This line is at line 41 in /backend/coumutationalUnit/extractExcel.js)"
    );
  };

const extractUsers =
  /* Reading the excel file and extracting the data from it. */
  async (filename) => {
    const workbook = new Excel.Workbook();
    errorValues = [];
    successCount = 0;
    lastprocessed = 0;

    await workbook.xlsx.readFile(filename);
    const worksheets = workbook.worksheets;

    for (let sheet = 0; sheet < worksheets.length; sheet++) {
      for (
        let rowNumber = 2;
        rowNumber <= worksheets[sheet].rowCount;
        rowNumber++
      ) {
        lastprocessed++;
        let row = worksheets[sheet].getRow(rowNumber);
        let user = {
          email: row.values[3],
          fullname: row.values[2],
          role: row.values[4],
        };
        let res = await validateUser(user);
        if (res) {
          errorValues.push(user);
        } else {
          // let password = controller.genPassword();
          let password = "password";
          await controller.register(user, password);
          await informUser(user);
          successCount++;
        }
      }
    }
    return await genResult(successCount, lastprocessed, errorValues);
  };
module.exports = { extractUsers };
