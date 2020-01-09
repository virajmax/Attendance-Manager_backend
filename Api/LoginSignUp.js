const express = require("express");
const router = express.Router();
const loginSignUp = require("../Logic/LoginSignUp");

router.post("/signup", (req, res) => {
  console.log(req.body);
  console.log("signup handling");
  loginSignUp.signUp(req, res);
});

router.post("/login", (req, res) => {
  console.log("login handling");
  loginSignUp.login(req, res);
});

module.exports = router;
