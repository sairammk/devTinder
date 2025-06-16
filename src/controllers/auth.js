const bcrypt = require("bcrypt");
const validator = require("validator");
const User = require("../models/user");
const { validateSignupData } = require("../utils/validation");

const signup = async (req, res) => {
  // Validation of data
  const { firstName, lastName, email, gender, password } = req.body;
  // Encrypt the password
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  // Creating a new instance of the user model
  const user = new User({
    firstName,
    lastName,
    email,
    gender,
    password: hashedPassword,
  });
  try {
    validateSignupData(req);
    await user.save();
    res.status(200).json({
      status: "success",
      message: "user created successfully",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).send("Error saving the user:" + err.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ status: "fail", message: "Invalid Credentials" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "Invalid Credentials",
      });
    }
    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      const token = await user.getJWT();

      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      return res.status(200).json({
        status: "success",
        message: "Login successful",
      });
    }
    throw new Error("Password is not correct");
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

const logout = async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
};

module.exports = {
  signup,
  login,
  logout,
};
