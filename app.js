const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const { connectDB } = require("./src/config/database");
const authRouter = require("./src/routes/auth");
const profileRouter = require("./src/routes/profile");
const requestRouter = require("./src/routes/request");
const userRouter = require("./src/routes/user");

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter, profileRouter, requestRouter, userRouter);

// app.get("/user", async (req, res) => {
//   const user = await User.find({ email: req.body.email });
//   if (!user) {
//     return res.status(404).json({
//       status: "fail",
//       message: "User not found",
//       data: [],
//     });
//   }
//   return res.status(200).json({
//     status: "success",
//     message: "User found",
//     data: {
//       user,
//     },
//   });
// });

// app.get("/feed", async (req, res) => {
//   try {
//     const users = await User.find({});
//     return res.status(200).json({
//       status: "success",
//       message: "users fetched successfully",
//       data: {
//         users,
//       },
//     });
//   } catch (err) {
//     return res.status(404).json({
//       status: "fail",
//       message: "No users found",
//       data: [],
//     });
//   }
// });

// app.delete("/user", async (req, res) => {
//   try {
//     // await User.findByIdAndDelete({ _id: req.body.userId });
//     const user = await User.findByIdAndDelete(req.body.userId);
//     return res.status(200).json({
//       status: "success",
//       message: "User deleted successfully",
//       data: {
//         user,
//       },
//     });
//   } catch (err) {
//     return res.status(404).json({
//       status: "fail",
//       message: "User not found",
//     });
//   }
// });

// app.patch("/user/:userId", async (req, res) => {
//   const data = req.body;

//   const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
//   const isUpdatesAllowed = Object.keys(data).every((k) =>
//     ALLOWED_UPDATES.includes(k)
//   );
//   try {
//     if (!isUpdatesAllowed) {
//       throw new Error("Update not allowed");
//     }
//     if (data.skils.length > 10) {
//       throw new Error("Skills cannot be more than 10");
//     }

//     const user = await User.findByIdAndUpdate(
//       { _id: req.params?.userId },
//       data,
//       {
//         returnDocument: "after",
//         runValidators: true,
//       }
//     );
//     return res.status(200).json({
//       status: "success",
//       message: "User updated successfully",
//       data: {
//         user,
//       },
//     });
//   } catch (err) {
//     return res.status(400).json({
//       status: "fail",
//       message: "Invalid user data",
//       data: err.message,
//     });
//   }
// });

// app.patch("/updateUser", async (req, res) => {
//   try {
//     const user = await User.findOneAndUpdate(
//       { email: req.body.email },
//       req.body,
//       {
//         returnDocument: "after",
//       }
//     );
//     return res.status(200).json({
//       status: "success",
//       message: "User updated successfully",
//       data: {
//         user,
//       },
//     });
//   } catch (err) {
//     return res.status(404).json({
//       status: "fail",
//       message: "User not found",
//       user: [],
//     });
//   }
// });

connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(3000, () => {
      console.log(`Server is successfully listening on port 3000...`);
    });
  })
  .catch((err) => console.log(`Database cannot be connected!: ${err}`));
