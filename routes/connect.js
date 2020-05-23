const util = require("util");
// mysql conn
const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "0803",
  database: "sms_easy",
});
connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
});

module.exports = util.promisify(connection.query).bind(connection);
