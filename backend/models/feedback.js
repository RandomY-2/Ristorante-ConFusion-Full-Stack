const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    telnum: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    feedback: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Feedbacks = mongoose.model("Feedbacks", feedbackSchema);
module.exports = Feedbacks;
