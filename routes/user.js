const router = require("express").Router();
const { verifyAuth, verifyAdmin } = require("../middleware/auth");
const User = require("../controllers/user");
router.route("/:id").put(verifyAuth, User.update);
router.route("/:id").delete(verifyAuth, User.delete);
router.route("/:id").get(verifyAdmin, User.getUser);
router.route("/admin/all").get(verifyAdmin, User.getAllUser);
router.route("/admin/stats").get(verifyAdmin, User.stats);
module.exports = router;
