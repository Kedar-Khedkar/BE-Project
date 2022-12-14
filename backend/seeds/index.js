const { sequelize, Sequelize } = require("../utils/database");
const associations = require("../models/associations");
const seedUsers = require("./seedUsers");
const seedSubjects = require("./seedSubjects");

const connection = async () => {
  /**
   * It tries to connect to the database, and if it succeeds, it prints a message to the console. If it
   * fails, it prints an error message
   */
  try {
    await sequelize.authenticate();
    console.log("[*]Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

const main = async () => {
  /* Creating the database and populating it with data. */
  await sequelize.sync({ force: true });
  await seedUsers.createUsers(seedUsers.facultyData);
  console.log("[+]added faculties");
  await seedSubjects.seedSubjects();
  console.log("[+]added subjects");
  await seedSubjects.associateSubjects();
  console.log("[+]added subject->faculty associations");
  await seedUsers.createUsers(seedUsers.studentData);
  console.log("[+]added students");
  await seedUsers.associateStudentData(seedUsers.studentData);
  console.log("[+]Student Data associated with student accounts");
};

connection().then(() => {
  /* Closing the database connection. */
  main().then(async () => {
    console.log("[*]Success!");
    console.log("[*]Closing Database connection ...");
    await sequelize.close();
    console.log("[1]Done");
  });
});
