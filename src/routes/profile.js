const router = require("express").Router();
const { getUserProfile, profileEdit, resetPassword } = require("../controllers/profile");
const { userAuth } = require("../middlewares/auth");

router.use(userAuth);

router.get("/profile/view", getUserProfile);

router.patch("/profile/edit", profileEdit);

router.patch('/profile/reset-password', resetPassword)

module.exports = router;
