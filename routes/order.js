const router = require("express").Router();
const Auth = require("../middleware/auth");
const Order = require("../controllers/order");

router.route("/").post(Auth.verifyAuth, Order.new);
router.route("/:id").put(Auth.verifyAdmin, Order.edit);
router.route("/:id").delete(Auth.verifyAuth, Order.delete);
router.route("/find/:userId").get(Auth.verifyAuth, Order.userOrder);
router.route("/all").get(Auth.verifyAdmin, Order.allOrder);
router.route("/income").get(Auth.verifyAdmin, Order.income);

module.exports = router;
