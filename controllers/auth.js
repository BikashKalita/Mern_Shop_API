const User = require("../models/User");
const bcrypt = require("bcryptjs");
const Auth = require("../utils/auth");
exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const newUser = await User.create({
      username,
      email,
      password: bcrypt.hashSync(password),
    });
    const token = Auth.signToken(newUser._id, newUser.isAdmin);
    res.status(200).json({ newUser, token });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.signin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const finduser = await User.findOne({ username }).select("+password");
    if (!finduser)
      return res
        .status(500)
        .json({ error: true, message: "Invalid Username or Password" });
    const validPassword = bcrypt.compareSync(password, finduser.password);
    if (!validPassword)
      return res
        .status(500)
        .json({ error: true, message: "Invalid Username or Password" });
    const token = Auth.signToken(finduser._id, finduser.isAdmin);
    res.status(200).json({ user: finduser, token });
  } catch (e) {
    res.status(500).json({ error: true, message: e });
  }
};
