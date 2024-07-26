const Router = require("express");
const {
  registerUser,
  loginUser,
  getUser,
  getUsers,
  getUserBooking,
  updateUser,
  uploadImage,
  removeImage,
  deleteUser,
  updateUserById,
  updateUserPass,
  googleLogin,
  verifyEmail,
} = require("../controllers/user.controllers");
const { verifyToken } = require("../middleware/authenticate");
const upload = require("../middleware/multer.middleware");
const router = Router();

router.route("/register").post(registerUser);
router.route("/getbookinginfo").get(verifyToken, getUserBooking);
router
  .route("/")
  .post(loginUser)
  .get(verifyToken, getUser)
  .patch(verifyToken, updateUser);
router
  .route("/uploadimg")
  .patch(verifyToken, upload.single("images"), uploadImage);
router.route("/removeimg").patch(verifyToken, removeImage);
router.route("/up").patch(updateUserPass);
router.route("/allusers").get(getUsers);
router.route("/google").post(googleLogin);
router.route("/:id").put(updateUserById).delete(deleteUser);

module.exports = router;
