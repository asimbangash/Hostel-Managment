const Router = require("express");
const {
  createReviews,
  getAllReviews,
  getReviews,
} = require("../controllers/reviews.controllers.js");
const { verifyToken } = require("../middleware/authenticate.js");
const router = Router();

router.route("/").post(verifyToken, createReviews).get(getAllReviews);
router.route("/:id").get(getReviews);

module.exports = router;
