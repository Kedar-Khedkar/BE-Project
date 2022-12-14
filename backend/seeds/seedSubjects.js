const { Faculty } = require("../models/faculty");
const { Subject } = require("../models/subject");
const { User } = require("../models/user");

const sample = (array /* Returning a random element from the array. */) =>
  array[Math.floor(Math.random() * array.length)];

module.exports.seedSubjects = async () => {
  /* Creating a new table in the database with the name `Subjects` and inserting the data from the
  `subjectData` array into the table. */
  await Subject.bulkCreate(subjectData);
};

module.exports.associateSubjects = async () => {
  /* This is a for loop which is iterating over the faculty table and assigning a random subject to
  each faculty. */
  for (let id = 1; id < 9; id++) {
    let subid = sample(subjectData).subCode;
    await Faculty.create({
      userId: id,
      SubjectSubCode: subid,
    });
  }
};

/* This is an array of objects. Each object represents a subject. */
subjectData = [
  {
    subCode: "414441",
    subName: "Information and Storage Retrieval",
    pract: 0,
    oral: 25,
    sem: 7,
  },
  {
    subCode: "414442",
    subName: "Software Project Management",
    pract: 0,
    oral: 25,
    sem: 7,
  },
  {
    subCode: "414443",
    subName: "Deep Learning",
    pract: 0,
    oral: 25,
    sem: 7,
  },
  {
    subCode: "414444",
    subName: "Mobile Computing",
    pract: 0,
    oral: 25,
    sem: 7,
  },
  {
    subCode: "414445",
    subName: "High Performance Computing",
    pract: 0,
    oral: 25,
    sem: 7,
  },
  {
    subCode: "414446",
    subName: "Multimedia Technology",
    pract: 0,
    oral: 25,
    sem: 7,
  },
  {
    subCode: "414447",
    subName: "Introduction to DevOps",
    pract: 0,
    oral: 25,
    sem: 7,
  },
  {
    subCode: "414448",
    subName: "Computer Vision",
    pract: 0,
    oral: 25,
    sem: 7,
  },
  {
    subCode: "414449",
    subName: "Wireless Communication",
    pract: 0,
    oral: 25,
    sem: 7,
  },
  {
    subCode: "414450",
    subName: "Lab Practice 3",
    pract: 25,
    oral: 25,
    sem: 7,
  },
  {
    subCode: "414451",
    subName: "Lab Practice 4",
    pract: 0,
    oral: 25,
    sem: 7,
  },
  {
    subCode: "414452",
    subName: "Project Stage 1",
    pract: 0,
    oral: 50,
    sem: 7,
  },
  {
    subCode: "414441A",
    subName: "Audit Course",
    pract: 0,
    oral: 25,
    sem: 7,
  },
];
