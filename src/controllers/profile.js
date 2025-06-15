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

module.exports = { getUserProfile };
