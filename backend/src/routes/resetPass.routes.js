const express = require("express");
const resetpassword = require("../controllers/resetPass.controllers");

const router = express.Router();
router.route("/resetpassword").post(resetpassword);

module.exports = router;
