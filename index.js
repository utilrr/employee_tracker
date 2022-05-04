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

// TODO: Create an array of questions for user input
const init = async () => {
  const { choice } = await inquirer.prompt([
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
  switch (choice) {
    case "view all departments":
      let [deptRows] = await viewDepts();
      console.table(deptRows);
      init();
      break;

    case "view all roles":
      let [roleRows] = await viewRoles();
      console.table(roleRows);
      init();
      break;

    case "view all employees":
      let [empRows] = await viewEmployees();
      console.table(empRows);
      init();
      break;

    case "add a department":
      await addDept();
      console.log("Department added successfully.");
      init();
      break;

    case "add a role":
      await addRole();
      console.log("Role added successfully.");
      init();
      break;

    case "add an employee":
      await addEmployee();
      console.log("Employee added successfully.");
      init();
      break;

    case "update employee role":
      await updateEmployeeRole();
      console.log("The employees role has been updated.");
      init();
      break;

    case "delete a department":
      await deleteDept();
      console.log("The department has been deleted.");
      init();
      break;

    case "delete a role":
      await deleteRole();
      console.log("The role has been deleted.");
      init();
      break;

    case "delete an employee":
      await deleteEmployee();
      console.log("The employee has been deleted.");
      init();
      break;

    case "done":
      console.log("Done");
      break;
  }
};

init();
