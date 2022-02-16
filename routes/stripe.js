const router = require("express").Router();
const Stripe = require("../controllers/stripe");
router.route("/payment").post(Stripe.payment);
module.exports = router;
