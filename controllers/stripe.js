const stripe = require("stripe")(process.env.STRIPE_KEY);

exports.payment = async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "usd",
    });
    res.status(200).json(paymentIntent);
  } catch (err) {
    res.status(500).json(err);
  }
  // //old_stripe
  // stripe.charges.create(
  //   {
  //     amount: req.body.amount,
  //     currency: "usd",
  //     source: req.body.tokenId,
  //     description: "My First Test Charge (created for API docs)",
  //   },
  //   (stripeErr, stripeRes) => {
  //     if (stripeErr) {
  //       res.status(500).json(stripeErr);
  //     } else {
  //       res.status(200).json(stripeRes);
  //     }
  //   }
  // );
};
