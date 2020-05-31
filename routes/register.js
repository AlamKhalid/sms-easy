const express = require("express");
const bcrypt = require("bcrypt");
const query = require("./connect");
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, email, pass } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(pass, salt);
    const id = Date.now();
    await query(
      `INSERT INTO users VALUES('${id}', '${username}', '${email}', '${hashedPass}')`
    );
    res.redirect(`/msg?id=${id}`);
  } catch (ex) {
    console.error(ex);
  }
});

module.exports = router;
