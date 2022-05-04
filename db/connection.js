const mysql = require("mysql2");

// Connect to database
const connect = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "password",
    database: "employees",
  },
  console.log("Connected to the employees database.")
);

const connection = connect.promise();

module.exports = db;
