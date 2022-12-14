const bcrypt = require("bcrypt");
const { Student } = require("../models/student");
const { User } = require("../models/user");

module.exports.createUsers = async (dataArray) => {
  /* Creating a salt and hash for each user and then creating the user
  from the data array*/
  for (let i = 0; i < dataArray.length; i++) {
    dataArray[i].passSalt = bcrypt.genSaltSync(10);
    dataArray[i].passHash = bcrypt.hashSync("password", dataArray[i].passSalt);
  }
  await User.bulkCreate(dataArray);
};

module.exports.associateStudentData = async (dataArray) => {
  /* This is creating a student object from dataArray and then creating a student in the database. */
  for (let i = 0; i < dataArray.length; i++) {
    let student = {
      userId: 10 + i,
      rollno: dataArray[i].rollno,
      prn: dataArray[i].prn,
    };
    await Student.create(student);
  }
};

/* This is an array of objects. Each object is a faculty member. */
module.exports.facultyData = [
  {
    fullname: "Rupali Chopade",
    email: "Rupalic@gmail.com",
    role: "admin",
    // passHash: "$2b$10$M3LjCpXe9QlHDf2xR5nvA.jnbcnSWdmM928fGGH487Aj3gCeplVS2",
    // passSalt: "$2b$10$M3LjCpXe9QlHDf2xR5nvA.",
  },
  {
    fullname: "Nikhil Dhavase",
    email: "Nikhild@gmail.com",
    role: "faculty",
    passHash: "$2b$10$M3LjCpXe9QlHDf2xR5nvA.jnbcnSWdmM928fGGH487Aj3gCeplVS2",
    passSalt: "$2b$10$M3LjCpXe9QlHDf2xR5nvA.",
  },
  {
    fullname: "Vijay Bidve",
    email: "Vijayb@gmail.com",
    role: "faculty",
    passHash: "$2b$10$M3LjCpXe9QlHDf2xR5nvA.jnbcnSWdmM928fGGH487Aj3gCeplVS2",
    passSalt: "$2b$10$M3LjCpXe9QlHDf2xR5nvA.",
  },
  {
    fullname: "Jitendra Chavan",
    email: "Jitendrac@gmail.com",
    role: "faculty",
    passHash: "$2b$10$M3LjCpXe9QlHDf2xR5nvA.jnbcnSWdmM928fGGH487Aj3gCeplVS2",
    passSalt: "$2b$10$M3LjCpXe9QlHDf2xR5nvA.",
  },
  {
    fullname: "Preeti Joshi",
    email: "Preetij@gmail.com",
    role: "faculty",
    passHash: "$2b$10$M3LjCpXe9QlHDf2xR5nvA.jnbcnSWdmM928fGGH487Aj3gCeplVS2",
    passSalt: "$2b$10$M3LjCpXe9QlHDf2xR5nvA.",
  },
  {
    fullname: "Bharati Vasagi",
    email: "Bharativ@gmail.com",
    role: "faculty",
    passHash: "$2b$10$M3LjCpXe9QlHDf2xR5nvA.jnbcnSWdmM928fGGH487Aj3gCeplVS2",
    passSalt: "$2b$10$M3LjCpXe9QlHDf2xR5nvA.",
  },
  {
    fullname: "Sheetal Kakad",
    email: "Sheetalk@gmail.com",
    role: "faculty",
    passHash: "$2b$10$M3LjCpXe9QlHDf2xR5nvA.jnbcnSWdmM928fGGH487Aj3gCeplVS2",
    passSalt: "$2b$10$M3LjCpXe9QlHDf2xR5nvA.",
  },
  {
    fullname: "Shraddha Mankar",
    email: "Shraddham@gmail.com",
    role: "faculty",
    passHash: "$2b$10$M3LjCpXe9QlHDf2xR5nvA.jnbcnSWdmM928fGGH487Aj3gCeplVS2",
    passSalt: "$2b$10$M3LjCpXe9QlHDf2xR5nvA.",
  },
  {
    fullname: "Pratik Kamble",
    email: "Pratikk@gmail.com",
    role: "faculty",
    passHash: "$2b$10$M3LjCpXe9QlHDf2xR5nvA.jnbcnSWdmM928fGGH487Aj3gCeplVS2",
    passSalt: "$2b$10$M3LjCpXe9QlHDf2xR5nvA.",
  },
];

/* This is an array of objects. Each object is a student. */
module.exports.studentData = [
  {
    fullname: "LOLE PADMAJA MANISH",
    email: "Lolep@gmail.com",
    role: "student",
    rollno: 1,
    prn: "71914278E",
  },
  {
    fullname: "AKSHAY SHAHAJI TALE",
    email: "Akshays@gmail.com",
    role: "student",
    rollno: 2,
    prn: "71914466D",
  },
  {
    fullname: "BADAVE PREETI KISHOR",
    email: "Badavep@gmail.com",
    role: "student",
    rollno: 3,
    prn: "71914031F",
  },
  {
    fullname: "BAHGWAT SHRUTI SUNIL",
    email: "Bhagwats@gmail.com",
    role: "student",
    rollno: 4,
    prn: "71914052J",
  },
  {
    fullname: "BALI SWASTI RAJESH",
    email: "Balis@gmail.com",
    role: "student",
    rollno: 5,
    prn: "71914035J",
  },
  {
    fullname: "BELEKAR GAURAV SURESH",
    email: "Belekarg@gmail.com",
    role: "student",
    rollno: 6,
    prn: "71914146L",
  },
  {
    fullname: "BHALE RUTUJA NILESH",
    email: "Bhaler@gmail.com",
    role: "student",
    rollno: 7,
    prn: "71717036F",
  },
  {
    fullname: "BHOMAJ BHAKTI SANJAY",
    email: "Bhomajb@gmail.com",
    role: "student",
    rollno: 8,
    prn: "71914061H",
  },
  {
    fullname: "BINDU BHARGAVI SHAILENDRA",
    email: "Bindub@gmail.com",
    role: "student",
    rollno: 9,
    prn: "71914062F",
  },
  {
    fullname: "BIRAJDAR SHAM BALAJI",
    email: "Birajdars@gmail.com",
    role: "student",
    rollno: 10,
    prn: "71914063D",
  },
  {
    fullname: "BISHT AMAN CHANDANSINGH",
    email: "Bishta@gmail.com",
    role: "student",
    rollno: 11,
    prn: "71826384H",
  },
  {
    fullname: "DASHPUTE PUSHKAR PRASHANT",
    email: "Dashputep@gmail.com",
    role: "student",
    rollno: 12,
    prn: "71914100B",
  },
];
