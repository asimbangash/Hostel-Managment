const Router = require("express");
const { createBooking } = require("../controllers/bookHostel.controllers");
const { verifyToken } = require("../middleware/authenticate");
const router = Router();

router.route("/").post(verifyToken, createBooking);

module.exports = router;
