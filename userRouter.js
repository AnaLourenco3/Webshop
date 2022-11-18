const express = require("express");
const { Router } = express;
const User = require("./models").user;

const router = new Router();

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (e) {
    next(e);
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
