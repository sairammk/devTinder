const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const sendConnectionRequest = async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const { toUserId, status } = req.params;

    const allowedStatus = new Set(["ignored", "interested"]);
    if (!allowedStatus.has(status)) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid status: " + status,
      });
    }

    const toUser = await User.findById(toUserId);
    if (!toUser) {
      return res.status(404).json({
        status: "fail",
        message: "User not found!",
      });
    }

    // If there is an existing ConnectionRequest
    const existingConnectionRequest = await ConnectionRequest.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });
    if (existingConnectionRequest) {
      return res.status(400).json({
        status: "fail",
        message: "Connection Request Already Exists!!",
      });
    }

    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });
    const conRequest = await connectionRequest.save();

    return res.status(200).json({
      status: "success",
      message: `Connection request ${
        status === "ignored" ? "ignored" : "sent"
      } successfully`,
      data: conRequest,
    });
  } catch (err) {
    return res.status(400).json({
      status: "Fail",
      message: err.message,
    });
  }
};

const userReviewsRequest = async (req, res) => {
  try {
    const loggedInUser = req.user;
    const { status, requestId } = req.params;

    // validate the status

    // sairam => Lily Labeau
    // is Lily Labeau = loggedIn User = toUserId
    // status: Interested
    // request Id should be valid

    const allowedStatus = new Set(["accepted", "rejected"]);
    if (!allowedStatus.has(status)) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid Status!!",
      });
    }

    const connectionRequest = await ConnectionRequest.findOne({
      _id: requestId,
      toUserId: loggedInUser._id,
      status: "interested",
    });
    if (!connectionRequest) {
      return res.status(404).json({
        status: "fail",
        message: "Connection request not found!!",
      });
    }

    connectionRequest.status = status;
    const data = await connectionRequest.save();

    return res.status(200).json({
      status: "success",
      message: "Connection request updated successfully!!",
      data,
    });
  } catch (err) {}
};

module.exports = { sendConnectionRequest, userReviewsRequest };
