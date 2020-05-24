const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/msg", (req, res) => {
  const id = req.query.id;
  res.render("msg", { id });
});

module.exports = router;
