const { sequelize } = require("./models");
const express = require("express");
const app = express();
const PORT = 4000;

const User = require("./models").user;
const Product = require("./models").product;
const Category = require("./models").category;

app.use(express.json());
app.use(cors());

app.get("/users", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (e) {
    next(e);
  }
});

app.get("/categories", async (req, res, next) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (e) {
    next(e);
  }
});

app.get("/products", async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (e) {
    next(e);
  }
});

app.post("/users", async (req, res, next) => {
  try {
    const email = req.body.email;
    if (!email || email === " ") {
      res.status(400).send("Must provide an email address");
    } else {
      const user = await User.create(req.body);
      res.json(user);
    }
  } catch (e) {
    next(e);
  }
});

// app.get("/categories/:categoryId", async (req, res, next) => {
//   try {
//     const categoryId = parseInt(req.params.categoryId);
//     if (!categoryId) {
//       res.status(400).send(`Category id must be valid`);
//     } else {
//       const findCategoryByPk = await Category.findByPk(categoryId);
//       if (!findCategoryByPk) {
//         res.status(404).send("Category was not found");
//       } else {
//         res.json(findCategoryByPk);
//       }
//     }
//   } catch (e) {
//     next(e);
//   }
// });

// app.get("/products/:categoryId", async (req, res, next) => {
//   try {
//     const categoryId = parseInt(req.params.categoryId);
//     if (!categoryId) {
//       res.status(400).send(`Category id must be valid`);
//     } else {
//       const findCategoryByPk = await Category.findByPk(categoryId, {
//         include: [Product],
//       });
//       if (!findCategoryByPk) {
//         res.status(404).send("Category was not found");
//       } else {
//         res.json(findCategoryByPk);
//       }
//     }
//   } catch (e) {
//     next(e);
//   }
// });

app.get("/categories/:categoryId", async (req, res, next) => {
  try {
    const categoryId = parseInt(req.params.categoryId);
    if (!categoryId) {
      res.status(400).send(`Category id must be valid`);
    } else {
      const findCategoryByPk = await Category.findByPk(categoryId, {
        include: { model: Product, attributes: ["title"] },
      });
      if (!findCategoryByPk) {
        res.status(404).send("Category was not found");
      } else {
        res.json(findCategoryByPk);
      }
    }
  } catch (e) {
    next(e);
  }
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
