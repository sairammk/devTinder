const router = require("express").Router();
const { getUserProfile } = require("../controllers/profile");
const { userAuth } = require("../middlewares/auth");

router.use(userAuth);

router.get("/profile", getUserProfile);

module.exports = router;
