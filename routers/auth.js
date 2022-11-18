const express = require("express");
const { Router } = express;
const router = new Router();
const { toJWT } = require("../auth/jwt");
const User = require("../models").user;

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userToLogin = await User.findOne({ where: { email: email } });
  if (!userToLogin) {
    res.status(422).send("Incorrect email/password");
    return;
  }
  if (userToLogin.password === password) {
    const token = toJWT({ userId: userToLogin.id });
    res.send({ token: token, name: userToLogin.name });
    return;
  } else {
    res.send("Incorrect password/email");
  }
});

module.exports = router;
