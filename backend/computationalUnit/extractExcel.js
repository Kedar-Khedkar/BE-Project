const Excel = require("exceljs");
const { User } = require("../models/user");

const extractUsers = async (filename) => {
  const workbook = new Excel.Workbook();
  await workbook.xlsx.readFile(filename);
  workbook.eachSheet((worksheet, sheetID) => {
    worksheet.eachRow(async (row, rowNumber) => {
      if (rowNumber > 1) {
        await User.create({
          PRN: row.values[3],
          email: row.values[2],
          fullname: row.values[1],
        });
      }
    });
  });
};

console.log("SUCCESS!!");

module.exports = { extractUsers };
