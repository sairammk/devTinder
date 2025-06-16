const ConnectionRequests = require("../models/connectionRequest");
const USER_SAFE_DATA = "firstName lastName age gender skills";

// Get all the pending connection requests for the loggedIn user
const userRequests = async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequests.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", [
      "firstName",
      "lastName",
      "age",
      "gender",
      "skills",
      "photoUrl",
    ]);
    // }).populate("fromUserId", "firstName lastName");

    res.status(200).json({
      status: "success",
      message: "Connection requests retrieved successfully",
      data: connectionRequests,
    });
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      message: "Error fetching user requests",
    });
  }
};

const userConnections = async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequests.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    const data = connectionRequests.map((user) => {
      if (user.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return user.toUserId;
      }
      return user.fromUserId;
    });

    res.status(200).json({
      status: "success",
      message: "Connection requests retrieved successfully",
      data,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Error fetching user connections",
    });
  }
};

module.exports = { userRequests, userConnections };
