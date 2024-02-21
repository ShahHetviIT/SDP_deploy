const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema(
  {
    pdf: {
      type: String,
      default: null,
    },
    message: {
      text: { type: String, required: true },
    },
    users: Array,
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Messages", MessageSchema);

