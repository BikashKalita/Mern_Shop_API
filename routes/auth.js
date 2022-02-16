const router = require("express").Router();
const Auth = require("../controllers/auth");
router.post("/register", Auth.register);
router.post("/login", Auth.signin);
module.exports = router;
