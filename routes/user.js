const express = require("express");
const query = require("./connect");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const router = express.Router();

router.get("/get-user/email/:emailid", async (req, res) => {
  const email = req.params.emailid;
  const row = await query(`SELECT id FROM users WHERE email='${email}'`);
  res.send(_.isEmpty(row));
});

router.get("/get-user/:username/:password", async (req, res) => {
  const user = req.params.username;
  const pass = req.params.password;
  const [row] = await query(
    `SELECT password FROM users WHERE username='${user}'`
  );
  if (row) {
    const validPass = await bcrypt.compare(pass, row.password);
    res.send(validPass ? true : false);
  } else res.send(false);
});

router.get("/get-user/:username", async (req, res) => {
  const user = req.params.username;
  const row = await query(`SELECT id FROM users WHERE username='${user}'`);
  res.send(_.isEmpty(row));
});

router.get("/get-msgs/:id", async (req, res) => {
  const id = req.params.id;
  const row = await query(`SELECT message FROM messages WHERE id='${id}'`);
  res.send(row);
});

router.post("/add-msg/:user", async (req, res) => {
  const user = req.params.user;
  const [row] = await query(`SELECT id FROM users WHERE username='${user}'`);
  const id = row.id;
  await query(
    `INSERT INTO messages(id, message) VALUES('${id}', '${req.body.message}')`
  );
  res.redirect(`/msg?id=${id}`);
});

module.exports = router;
