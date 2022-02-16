require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const userRoute = require("./routes/user");
const loginRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const paymentRoute = require("./routes/stripe");
mongoose
  .connect(process.env.CLUSTER_URL)
  .then(() => console.log("CONNECTED"))
  .catch((e) => console.log(e));
app.use(express.json());
app.use(cors());
app.use("/api/user", userRoute);
app.use("/api/auth", loginRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", paymentRoute);
app.listen(process.env.PORT, () =>
  console.log(`Lisiting...${process.env.PORT}`)
);
