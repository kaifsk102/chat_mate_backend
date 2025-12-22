const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TokenSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: "users" },
    email: { type: String, required: true, trim: true },
    device: { type: String, required: true, trim: true },
    active_session_refresh_token: { type: String, required: true },
    access_token: { type: String },
    token_expiry: { type: Date },
    push_token: { type: String },
    push_id: { type: String },
  },
  { timestamps: true }
);

const TokenModel = mongoose.model("tokens", TokenSchema);
module.exports = TokenModel;
