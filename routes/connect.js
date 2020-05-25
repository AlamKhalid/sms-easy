const util = require("util");
// mysql conn
const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "sql12.freemysqlhosting.net",
  user: "sql12343205",
  password: "JKizkHHzX7",
  database: "sql12343205",
});
connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
});

module.exports = util.promisify(connection.query).bind(connection);
