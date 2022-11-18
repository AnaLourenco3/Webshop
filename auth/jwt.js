const jwt = require("jsonwebtoken");

const secret =
  process.env.JWT_SECRET || "bvALiur75unalb193vh8shbfpoDP03Kxfghtuu6";

const toJWT = (data) => {
  return (token = jwt.sign(data, secret, { expiresIn: "2h" }));
};

const toData = (token) => {
  return (data = jwt.verify(token, secret));
};

// const userToken = toJWT({
//   message: "there was a lion and a bear, they caught and killed a goat",
// });

// const userData = toData(userToken);
module.exports = { toJWT, toData };
