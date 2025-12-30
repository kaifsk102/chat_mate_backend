const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone_number: { type: String, required: true },
    profile_image_url: { type: String, trim: true },
    password: { type: String, required: true },
    is_active: { type: Boolean, default: true },

    // ADD FRIENDS
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
  },
  { timestamps: true }
);

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
