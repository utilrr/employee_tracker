const db = require("../db/connection");
const inquirer = require("inquirer");

//view all data fron employees
const viewEmployees = () => {
  const sqlQuery = "SELECT * FROM employee";
  return db.query(sqlQuery);
};

//inserting answers to add an employee into the database
const addEmployee = async () => {
  const answer = await inquirer.prompt([
    {
      type: "input",
      name: "empFirstName",
      message: "What is the first name of the employee?",
      validate: (userInput) => {
        if (userInput) {
          return true;
        } else {
          console.log("You must enter a first name for this employee.");
          return false;
        }
      },
    },

    {
      type: "input",
      name: "empLastName",
      message: "What is the last name of the employee?",
      validate: (userInput) => {
        if (userInput) {
          return true;
        } else {
          console.log("You must enter a last name for this employee.");
          return false;
        }
      },
    },

    {
      type: "input",
      name: "empRole",
      message: "What is the role of the employee?",
      validate: (userInput) => {
        if (userInput) {
          return true;
        } else {
          console.log("You must enter a role for this employee.");
          return false;
        }
      },
    },

    {
      type: "input",
      name: "empManager",
      message: "Who is the manager for the employee?",
      validate: (userInput) => {
        if (userInput) {
          return true;
        } else {
          console.log("You must enter a manager for this employee.");
          return false;
        }
      },
    },
  ]);
  firstName = answer.empFirstName;
  lastName = answer.empLastName;
  role = answer.empRole;
  manager = answer.empManager;
  const sqlQuery = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${firstName}","${lastName}","${role}","${manager}")`;
  return db.query(
    sqlQuery,
    answer.empFirstName,
    answer.empLastName,
    answer.empRole,
    answer.empManager
  );
};

//updating employee role in the database
const updateEmployeeRole = async () => {
  const answer = await inquirer.prompt([
    {
      type: "input",
      name: "employee_id",
      message: "Provide employee id to update.",
    },
    {
      type: "input",
      name: "updateRoleId",
      message: "Provide a new role id for the employee.",
    },
  ]);
  let employee_id = answer.employee_id;
  let updateRoleId = answer.updateRoleId;
  const sqlQuery = `UPDATE employee SET role_id = ${updateRoleId} WHERE id = ${employee_id}`;
  return db.query(sqlQuery);
};

const deleteEmployee = async () => {
  await inquirer
    .prompt([
      {
        type: "input",
        name: "deleteEmployeeId",
        message: "What is the ID of the employee that you want to delete?",
      },
    ])
    .then((answer) => {
      const sqlQuery = "DELETE FROM employee WHERE id = ?";
      return db.query(sqlQuery, answer.deleteEmployeeId);
    });
};

//exporting the employee data
module.exports = {
  viewEmployees: viewEmployees,
  addEmployee: addEmployee,
  updateEmployeeRole: updateEmployeeRole,
  deleteEmployee: deleteEmployee,
};
