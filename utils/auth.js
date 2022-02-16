require("dotenv").config();
const jwt = require("jsonwebtoken");

const signToken = (userId, admin) => {
  return jwt.sign({ id: userId, isAdmin: admin }, process.env.JWT_SCERET, {
    expiresIn: "3d",
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SCERET);
};
module.exports = { signToken, verifyToken };
