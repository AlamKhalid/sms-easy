const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/msg", (req, res) => {
  res.render("msg");
});

module.exports = router;
