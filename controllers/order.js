const Order = require("../models/Order");

exports.new = async (req, res) => {
  try {
    const newOrder = await Order.create(req.body);
    res.status(200).json(newOrder);
  } catch (e) {
    res.status(500).json({ error: true, message: e.message });
  }
};

exports.edit = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (e) {
    res.status(500).json({ error: true, message: "Something Went Wrong" });
  }
};

exports.delete = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: "sucess", message: "Order Deleted" });
  } catch (e) {
    res.status(500).json({ error: true, message: "Something Went Wrong" });
  }
};

exports.userOrder = async (req, res) => {
  try {
    const userOrder = await Order.find({ userId: req.params.userId });
    res.status(200).json(userOrder);
  } catch (e) {
    res.status(500).json({ error: true, message: "Something Went Wrong" });
  }
};

exports.allOrder = async (req, res) => {
  try {
    const allOrder = await Order.find();
    res.status(200).json(allOrder);
  } catch (e) {
    res.status(500).json({ error: true, message: "Something Went Wrong" });
  }
};

exports.income = async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  try {
    const data = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);

    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: true, message: "Something Went Wrong" });
  }
};
