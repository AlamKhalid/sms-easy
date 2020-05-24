const express = require("express");
const bcrypt = require("bcrypt");
const query = require("./connect");
const router = express.Router();

router.post("/login", async (req, res) => {
  const { user } = req.body;
  const [row] = await query(`SELECT * FROM users WHERE username='${user}'`);
  res.redirect(`/msg?id=${row.id}`);
});

module.exports = router;
