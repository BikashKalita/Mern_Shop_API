const Auth = require("../middleware/auth");
const Product = require("../controllers/product");
const router = require("express").Router();
router.route("/").post(Auth.verifyAdmin, Product.add);
router.route("/:id").get(Product.get);
router.route("/list/all").get(Product.getAll);
module.exports = router;
