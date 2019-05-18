const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    email: {
      required: true,
      unique: true,
      type: String
    },
    password: {
      required: true,
      type: String
    },
    username: {
      unique: true,
      type: String
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
