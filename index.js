const express = require("express");
const bodyParser = require("body-parser");
const common = require("./routes/common");
const login = require("./routes/login");
const register = require("./routes/register");
const user = require("./routes/user");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); // use the contents of public folder
app.set("view engine", "ejs"); // settings the default ejs types files to be rendered

app.use(express.json());
app.use("/", common);
app.use("/", login);
app.use("/", register);
app.use("/", user);

const port = process.env.PORT || 3500;
app.listen(port, process.env.IP, () => {
  console.log(`Listening at ${port}...`);
});
