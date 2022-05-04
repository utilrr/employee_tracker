const db = require("../db/connection");
const inquirer = require("inquirer");

//view all the data from departments
const viewDepts = () => {
  const sqlQuery = "SELECT * FROM department";
  return db.query(sqlQuery);
};

//adding a department into the database
const addDept = async () => {
  await inquirer
    .prompt([
      {
        type: "input",
        name: "addDeptName",
        message: "What is the name of the department?",
      },
    ])
    .then((answer) => {
      const sqlQuery = "INSERT INTO department (name) VALUES (?)";
      return db.query(sqlQuery, answer.addDeptName);
    });
};

//deleting a department from the database
const deleteDept = async () => {
  const answer = await inquirer
    .prompt([
      {
        type: "input",
        name: "deleteDeptId",
        message: "What is the ID of the department that you want to delete?",
      },
    ])
    .then((answer) => {
      const sqlQuery = `DELETE FROM department WHERE id = ?`;
      return db.query(sqlQuery, answer.deleteDeptId);
    });
};

//exporting the department data
module.exports = {
  viewDepts: viewDepts,
  addDept: addDept,
  deleteDept: deleteDept,
};
