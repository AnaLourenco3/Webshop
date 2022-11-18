const { sequelize } = require("./models");
const express = require("express");
const productRouter = require("./productRouter");
const AuthRouter = require("./routers/auth");
const userRouter = require("./userRouter");
const cors = require("cors");
const app = express();
const PORT = 4000;
app.use(express.json());
app.use(cors());

app.use("/products", productRouter);
app.use("/auth", AuthRouter);
app.use("/users", userRouter);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
