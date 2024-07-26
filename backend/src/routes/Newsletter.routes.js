const Router = require("express");
const { verifyToken } = require("../middleware/authenticate");
const { Newsletter } = require("../controllers/Newsletter.controllers");
const router = Router();

router.route("/").post(verifyToken, Newsletter);

module.exports = router;
