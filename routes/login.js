const express = require("express");
const bcrypt = require("bcrypt");
const query = require("./connect");
const router = express.Router();

router.post("/login", async (req, res) => {
  const { user, pass } = req.body;
  const [row] = await query(`SELECT * FROM users WHERE username='${user}'`);
  const validPassword = await bcrypt.compare(pass, row.password);
  if (!validPassword)
    return res.render("home", {
      openModal: true,
      modalName: "login",
      error: "pass",
    });
  res.redirect("/msg");
});

module.exports = router;
