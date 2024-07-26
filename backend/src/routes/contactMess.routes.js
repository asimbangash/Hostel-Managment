const Router = require("express");
const {
    createMessage,
    getAllMessages
} = require("../controllers/contactMess.controllers.js");
const { verifyToken } = require("../middleware/authenticate.js");
const router = Router();

router.route("/").post(verifyToken, createMessage).get(getAllMessages);
// router.route("/:id").get(getReviews);

module.exports = router;
