const User = require("../models/user");
const { validateProfileEditData } = require("../utils/validation");
const validator = require("validator");
const bcrypt = require("bcrypt");

const getUserProfile = async (req, res) => {
  try {
    const user = req.user;

    return res.status(200).json({
      status: "success",
      message: "Profile retrieved successfully",
      data: {
        user,
      },
    });
  } catch (err) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid token",
    });
  }
};

const profileEdit = async (req, res) => {
  try {
    if (!validateProfileEditData(req)) {
      throw new Error("Invalid Edit Request");
    }

    // USING MONGODB
    const loggedInUser = await User.findByIdAndUpdate(
      { _id: req.user._id },
      req.body,
      {
        returnDocument: "after",
      }
    );
    if (!loggedInUser) {
      throw new Error("User not found");
    }

    // // USING CUSTOM LOGIC
    // const loggedInUser = req.user;

    // Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    // await loggedInUser.save();

    return res.status(200).json({
      status: "success",
      message: "Profile updated successfully",
      data: {
        user: loggedInUser,
      },
    });
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      message: "ERROR: " + err.message,
    });
  }
};

const resetPassword = async (req, res) => {
  const { password } = req.body;
  try {
    if (!validator.isStrongPassword(password)) {
      throw new Error("password is not Strong");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(req.user._id, { password: hashedPassword });

    return res.status(200).json({
      status: "success",
      message: "Password reset successfully",
    });
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      message: "ERROR: " + err.message,
    });
  }
};

module.exports = { getUserProfile, profileEdit, resetPassword };
