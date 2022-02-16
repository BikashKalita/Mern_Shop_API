const Products = require("../models/Products");
exports.add = async (req, res) => {
  try {
    const newProduct = await Products.create(req.body);
    res.status(200).json(newProduct);
  } catch (e) {
    console.log(e);
  }
};

exports.get = async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: true, message: "something went wrong" });
  }
};

exports.getAll = async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let product;
    if (qNew) {
      product = await Products.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      product = await Products.find({ category: { $in: [qCategory] } });
    } else {
      product = await Products.find();
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: true, message: "something went wrong" });
  }
};
