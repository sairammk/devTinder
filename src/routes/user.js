const { userRequests, userConnections } = require("../controllers/user");
const { userAuth } = require("../middlewares/auth");
const router = require("express").Router();

router.use(userAuth);

router.get("/user/requests/received", userRequests);

router.get("/user/connections", userConnections);

module.exports = router;
