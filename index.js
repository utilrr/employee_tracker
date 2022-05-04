const inquirer = require("inquirer");
const db = require("./db/connection");
const cTable = require("console.table");

const fs = require("fs");

// TODO: Create an array of questions for user input
const questions = [
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
      "Add an employees",
      "Update employee role",
    ],
    when: ({ confirmOptions }) => {
      if (confirmOptions) {
        return true;
      } else {
        return false;
      }
    },
  },
];
