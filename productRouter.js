const express = require("express");
const { Router } = express;
const AuthRouter = require("./routers/auth");
const { toData } = require("./auth/jwt");
const User = require("./models").user;
const Product = require("./models").product;
const Category = require("./models").category;

const router = new Router();
router.use("/auth", AuthRouter);

// GET - /products: Returns a list of products with their categories

router.get("/", async (req, res, next) => {
  const authorize =
    req.headers.authorization && req.headers.authorization.split(" ");
  if (authorize && authorize[0] === "Bearer" && authorize[1]) {
    try {
      const data = toData(authorize[1]);
      // try {
      //   const products = await Product.findAll({ include: [Category] });
      //   res.json(products);
      // } catch (e) {
      //   next(e);
      // }
    } catch (error) {
      res.status(400).send("Please send a valid token");
      return;
    }
  } else {
    res.status(401).send("Authorization fail");
  }
  try {
    const products = await Product.findAll({ include: [Category] });
    res.json(products);
  } catch (e) {
    next(e);
  }
});

// GET - /products/:id Returns a specific product with it's category

router.get("/:id", async (req, res, next) => {
  try {
    const productId = parseInt(req.params.id);
    if (!productId) {
      res.status(400).send("Product Id must be valid");
    } else {
      const findProductByPk = await Product.findByPk(productId, {
        include: [Category],
      });
      if (!findProductByPk) {
        res.status(404).send("Product was not found");
      } else {
        res.json(findProductByPk);
      }
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
