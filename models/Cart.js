const { model, Schema } = require("mongoose");

const CartSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    product: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Cart = model("cart", CartSchema, "carts");
module.exports = Cart;
