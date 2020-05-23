const express = require("express");
const query = require("./connect");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const router = express.Router();

router.get("/get-user/:username/:password", async (req, res) => {
  const user = req.params.username;
  const pass = req.params.password;
  const [row] = await query(
    `SELECT password FROM users WHERE username='${user}'`
  );
  if (row) {
    const validPass = await bcrypt.compare(pass, row.password);
    res.send(validPass);
  } else res.send(false);
});

router.get("/get-user/:username", async (req, res) => {
  const user = req.params.username;
  const row = await query(`SELECT id FROM users WHERE username='${user}'`);
  res.send(_.isEmpty(row));
});

module.exports = router;
