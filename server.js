const { sequelize } = require("./models");
const express = require("express");
const productRouter = require("./productRouter");
const app = express();
const PORT = 4000;
app.use(express.json());
// app.use(cors());

app.use("/products", productRouter);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
