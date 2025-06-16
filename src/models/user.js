const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SECRET_KEY = "CHLOE_AMOUR";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 2,
      maxLength: 50,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(email) {
        if (!validator.isEmail(email)) {
          throw new Error(`Invalid email address: ${email}`);
        }
      },
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: 18,
      max: 60,
    },
    gender: {
      type: String,
      lowercase: true,
      validate(value) {
        if (!["male", "female", "shemale", "others"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
    },
    photoUrl: {
      type: String,
      validate(url) {
        if (!validator.isURL(url)) {
          throw new Error(`Invalid Photo URL: ${url}`);
        }
      },
    },
    about: {
      type: String,
      default: "This is the default about of the user",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.index({ firstName: 1, lastName: 1 });

userSchema.methods.getJWT = async function () {
  const user = this;
  return await jwt.sign({ _id: user._id }, SECRET_KEY, {
    expiresIn: "1d",
  });
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const hashedPassword = this.password;
  return await bcrypt.compare(passwordInputByUser, hashedPassword);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
