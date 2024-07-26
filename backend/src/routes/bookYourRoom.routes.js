const Router = require("express");
const {
  bookYourRoom,
  getAllUser,
  getUserRoom,
  deleteUser,
  updateUser,
} = require("../controllers/bookYourRoom.controllers");
const { verifyToken } = require("../middleware/authenticate");
const router = Router();

router.route("/").post(verifyToken, bookYourRoom).get(getAllUser);
router.route("/userroom").get(verifyToken, getUserRoom);
router.route("/:id").delete(deleteUser).put(updateUser);

module.exports = router;
