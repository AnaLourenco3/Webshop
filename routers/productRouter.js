const express = require("express");
const { Router } = express;
const Product = require("../models").product;
const Category = require("../models").category;

const router = new Router();

// GET - /products: Returns a list of products with their categories

router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll({ include: [Category] });
    res.json(products);
  } catch (e) {
    next(e);
  }
});

router.get("/categories", async (req, res, next) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
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
