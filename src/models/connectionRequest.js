const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // reference to the user collection
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: (props) => `${props.value} is an incorrect status type`, // check mongoose custom validations for enum and try for gender in user schema
      },
    },
  },
  {
    timestamps: true,
  }
);

connectionRequestSchema.index({ fromUserId: 1, toUserId: -1 });

connectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this;
  // Check if fromUserId & toUserId is same
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("You cannot send connection request to yourself!");
  }
  next();
});

const connectionRequest = mongoose.model(
  "connectionRequest",
  connectionRequestSchema
);
module.exports = connectionRequest;
