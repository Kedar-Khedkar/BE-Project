const Excel = require("exceljs");
const { User } = require("../models/user");

const extractUsers = async (filename) => {
  const workbook = new Excel.Workbook();
  await workbook.xlsx.readFile(filename);
  let users = [];
  workbook.eachSheet((worksheet, sheetID) => {
    worksheet.eachRow(function (row, rowNumber) {
      if (rowNumber > 1) {
        users.push(new User({ PRN: row[3], email: row[2], fullname: row[1] }));
      }
    });
  });
  console.log(...users);
};

extractUsers("../public/uploads/BE project sheets.xlsx");

// module.exports = { extractUsers };
