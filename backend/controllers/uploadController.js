module.exports.postImage = (req, res) => {
  try {
    res.status(200).json(req.file);
  } catch (error) {
    res.status(503).json({ error: error.message });
  }
};

module.exports.uploadUnsupportedHandler = (req, res) => {
  res.status(403).json({ message: "This operation is not supported" });
};
