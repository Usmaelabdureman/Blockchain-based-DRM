const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },

    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },

    userType: {
      type: String,
      //   enum: ["creator", "consumer"],
      //   // required: true,
    },
    // google id
    googleId: { type: String },
    facebookId: { type: String },
  },
  {
    timestamps: true,
  },
);
module.exports = mongoose.model("User", userSchema);
