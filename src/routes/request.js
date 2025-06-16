const {
  sendConnectionRequest,
  userReviewsRequest,
} = require("../controllers/request");

const router = require("express").Router();

router.post("/request/send/:status/:toUserId", sendConnectionRequest);

router.post("/request/review/:status/:requestId", userReviewsRequest);

module.exports = router;
