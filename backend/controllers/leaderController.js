module.exports.getLeaders = (req, res) => {
  try {
    res.status(200).json({ message: "Getting Leaders" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.postLeader = (req, res) => {
  const { name, id } = req.body;

  try {
    res.status(200).json({ message: "Creating Leader", name, id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.getLeaderById = (req, res) => {
  const { leaderId } = req.params;

  try {
    res
      .status(200)
      .json({ message: `Getting the Leader with id: ${leaderId}` });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.updateLeaderById = (req, res) => {
  const { leaderId } = req.params;

  try {
    res
      .status(200)
      .json({ message: `Updating the Leader with id: ${leaderId}` });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.deleteLeaderById = (req, res) => {
  const { leaderId } = req.params;

  try {
    res
      .status(200)
      .json({ message: `Deleting the Leader with id: ${leaderId}` });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.leaderUnsupportedHandler = (req, res) => {
  res.status(404).json({ message: "This operation is not supported" });
};
