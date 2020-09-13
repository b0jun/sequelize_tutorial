const express = require("express");
const router = express.Router();
const { User } = require("../db/models");

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.render("chat", { users });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = router;
