const { sequelize } = require("./models");
const express = require("express");
const productRouter = require("./routers/productRouter");
const AuthRouter = require("./routers/auth");
const userRouter = require("./routers/userRouter");
const cors = require("cors");
const authMiddleware = require("./auth/middleware");
const app = express();
const PORT = 4000;
app.use(express.json());
app.use(cors());

// authentication is working properly but we cant use it until we have proper token management logic in the FE
// app.use("/products", authMiddleware, productRouter);

app.use("/products", productRouter);
app.use("/auth", AuthRouter);
app.use("/users", userRouter);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
