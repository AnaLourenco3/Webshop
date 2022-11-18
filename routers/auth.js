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

router.post("/signup", async (req, res, next) => {
  try {
    const email = req.body.email;
    if (!email || email === " ") {
      res.status(400).json({ message: "Must provide an email address" });
    } else {
      const users = await User.findAll();
      const emails = users.map((user) => user.email.toLowerCase());
      if (emails.includes(email)) {
        res
          .status(400)
          .json({ message: "Must provide valid and unique credentials" });
      } else {
        const user = await User.create(req.body);
        res.json(user);
      }
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "error creating new user" });
    next(e);
  }
});

module.exports = router;
