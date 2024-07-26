const Router = require("express");
const { searchHostel } = require("../controllers/searchHostel.controllers.js");
const router = Router();

router.route("/").post(searchHostel);

module.exports = router;
