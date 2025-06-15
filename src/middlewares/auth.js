const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Token is not Valid");
    }

    const { _id } = await jwt.verify(token, "CHLOE_AMOUR");
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: `ERROR: ${err.message}`,
    });
  }
};
module.exports = { userAuth };
