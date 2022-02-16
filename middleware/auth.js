const { verifyToken } = require("../utils/auth");

const auth = async (req, res, next) => {
  try {
    const token = req.header("x-auth-token").split(" ")[1];
    if (!token)
      return res.status(401).json({ status: false, message: "Not Authorized" });
    const user = await verifyToken(token);
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ status: false, message: "Not Authorized" });
  }
};
const verifyAuth = async (req, res, next) => {
  auth(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res.status(400).json({ status: false, message: "Not Authorized" });
    }
  });
};
const verifyAdmin = async (req, res, next) => {
  auth(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(400).json({ status: false, message: "Not Authorized" });
    }
  });
};
module.exports = { auth, verifyAuth, verifyAdmin };
