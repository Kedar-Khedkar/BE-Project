const Excel = require("exceljs");
const { User } = require("../models/user");
const { userUploadSchema } = require("../schemas");

const extractUsers = async (filename) => {
  const workbook = new Excel.Workbook();
  errorValues = [];
  successCount = 0;
  lastprocessed = 0;
  await workbook.xlsx.readFile(filename);
  workbook.eachSheet(async (worksheet, sheetID) => {
    worksheet.eachRow(async (row, rowNumber) => {
      lastprocessed++;
      if (rowNumber > 1) {
        let user = {
          email: row.values[3],
          fullname: row.values[2],
          role: row.values[4],
        };
        const { error } = userUploadSchema.validate(user);
        if (error) {
          user.errmsg = error.details[0].message;
          errorValues.push(user);
        } else {
          successCount++;
          let errmsg = await User.create(user)
            .then((res) => {
              return undefined;
            })
            .catch((error) => {
              return error.parent.sqlMessage;
            });
          if (errmsg) {
            user.errmsg = errmsg;
            console.log(errmsg);
            errorValues.push(user);
            successCount--;
          }
        }
      }
    });
  });
  if (errorValues.length == 0) {
    return {
      result: "SUCCESS",
      msg: `${successCount} users added out of ${lastprocessed - 1}`,
    };
  } else {
    return {
      result: "FAILURE",
      msg: `${successCount} users added out of ${lastprocessed - 1}`,
      errdata: errorValues,
    };
  }
};
module.exports = { extractUsers };
