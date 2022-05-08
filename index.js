const inquirer = require("inquirer");
const db = require("./db/connection");
const cTable = require("console.table");

const { viewDepts, addDept, deleteDept } = require("./controllers/dept");
const { viewRoles, addRole, deleteRole } = require("./controllers/role");
const {
  viewEmployees,
  addEmployee,
  updateEmployeeRole,
  deleteEmployee,
} = require("./controllers/emp");

const viewAllDepts = async () => {
  const [deptRows] = await viewDepts();
  console.table(deptRows);
};

const viewAllRoles = async () => {
  const [roleRows] = await viewRoles();
  console.table(roleRows);
};

const viewAllEmployees = async () => {
  const [empRows] = await viewEmployees();
  console.table(empRows);
};

// TODO: Create an array of questions for user input
const startQuestions = async () => {
  const { options } = await inquirer.prompt([
    {
      type: "list",
      name: "options",
      message: "What task would you like to accomplish?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update employee role",
        "Delete a department",
        "Delete a role",
        "Delete an employee",
        "Done",
      ],
    },
  ]);

  // switch for each selected choice
  switch (options) {
    case "View all departments":
      await viewAllDepts();
      startQuestions();
      break;

    case "View all roles":
      await viewAllRoles();
      startQuestions();
      break;

    case "View all employees":
      await viewAllEmployees();
      startQuestions();
      break;

    case "Add a department":
      await addDept();
      await viewAllDepts();
      startQuestions();
      break;

    case "Add a role":
      await addRole();
      await viewAllRoles();
      startQuestions();
      break;

    case "Add an employee":
      await addEmployee();
      await viewAllEmployees();
      startQuestions();
      break;

    case "Update employee role":
      await updateEmployeeRole();
      await viewAllRoles();
      startQuestions();
      break;

    case "Delete a department":
      await deleteDept();
      await viewAllDepts();
      startQuestions();
      break;

    case "Delete a role":
      await deleteRole();
      await viewAllRoles();
      startQuestions();
      break;

    case "Delete an employee":
      await deleteEmployee();
      await viewAllEmployees();
      startQuestions();
      break;

    default:
      db.end();
  }
};

startQuestions();
