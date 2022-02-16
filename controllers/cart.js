const Cart = require("../models/Cart");
exports.add = async (req, res) => {
  try {
    const newCart = await Cart.create(req.body);
    res.status(200).json(newCart);
  } catch (e) {
    res.status(500).json(e._message);
  }
};

exports.update = async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (e) {
    res.status(500).json({ error: true, message: e });
  }
};

exports.delete = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Removed from Cart" });
  } catch (e) {
    res.status(500).json({ error: true, message: e });
  }
};

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.find({ userId: req.params.userId });
    res.status(200).json(cart);
  } catch (e) {
    res.status(500).json({ error: true, message: e });
  }
};

exports.getAllCart = async (req, res) => {
  try {
    const allCarts = await Cart.find();
    res.status(200).json(allCarts);
  } catch (e) {
    res.status(500).json({ error: true, message: e });
  }
};
