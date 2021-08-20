const mongoose = require("mongoose");
const Feedbacks = require("../models/feedback");

module.exports.getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedbacks.find();
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(503).json({ error: error.message });
  }
};

module.exports.postFeedback = async (req, res) => {
  try {
    const feedback = req.body;
    const newFeedback = new Feedbacks(feedback);

    await newFeedback.save();
    res.status(200).json(newFeedback);
  } catch (error) {
    res.status(503).json({ error: error.message });
  }
};
