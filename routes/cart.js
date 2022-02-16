const router = require("express").Router();
const Cart = require("../controllers/cart");
const Auth = require("../middleware/auth");
router.route("/").post(Auth.verifyAuth, Cart.add);
router.route("/:id").put(Auth.verifyAuth, Cart.update);
router.route("/:id").delete(Auth.verifyAuth, Cart.delete);
router.route("/find/:userId").get(Auth.verifyAuth, Cart.getCart);
router.route("/").get(Auth.verifyAdmin, Cart.getAllCart);
module.exports = router;
