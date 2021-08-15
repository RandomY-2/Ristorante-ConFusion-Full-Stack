const mongoose = require("mongoose");
const Leaders = require("../models/leaders");

module.exports.getLeaders = async (req, res) => {
  try {
    const leaders = await Leaders.find();
    res.status(200).json(leaders);
  } catch (error) {
    res.status(503).json({ error: error.message });
  }
};

module.exports.postLeader = async (req, res) => {
  try {
    const leader = req.body;
    const newLeader = new Leaders(leader);

    await newLeader.save();
    res.status(200).json(newLeader);
  } catch (error) {
    res.status(503).json({ error: error.message });
  }
};

module.exports.getLeaderById = async (req, res) => {
  try {
    const { leaderId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(leaderId)) {
      return res.status(404).json({
        error: "No leader with the given id",
      });
    }

    const leader = await Leaders.findById(leaderId);
    res.status(200).json(leader);
  } catch (error) {
    res.status(503).json({ error: error.message });
  }
};

module.exports.updateLeaderById = async (req, res) => {
  try {
    const { leaderId } = req.params;
    const newLeader = req.body;

    if (!mongoose.Types.ObjectId.isValid(leaderId)) {
      return res.status(404).json({
        error: "No leader with the given id",
      });
    }

    const updatedLeader = await Leaders.findByIdAndUpdate(leaderId, newLeader, {
      new: true,
    });
    await updatedLeader.save();
    res.status(200).json(updatedLeader);
  } catch (error) {
    res.status(503).json({ error: error.message });
  }
};

module.exports.deleteLeaderById = async (req, res) => {
  try {
    const { leaderId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(leaderId)) {
      return res.status(404).json({
        error: "No leader with the given id",
      });
    }

    await Leaders.findByIdAndDelete(leaderId);
    res.status(200).json({ message: "Leader successfully deleted" });
  } catch (error) {
    res.status(503).json({ error: error.message });
  }
};

module.exports.leaderUnsupportedHandler = (req, res) => {
  res.status(404).json({ error: "This operation is not supported" });
};
