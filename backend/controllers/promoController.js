module.exports.getPromotions = (req, res) => {
  try {
    res.status(200).json({ message: "Getting Promotions" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.postPromotion = (req, res) => {
  const { name, id } = req.body;

  try {
    res.status(200).json({ message: "Creating Promotion", name, id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.getPromotionById = (req, res) => {
  const { promotionId } = req.params;

  try {
    res
      .status(200)
      .json({ message: `Getting the Promotion with id: ${promotionId}` });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.updatePromotionById = (req, res) => {
  const { promotionId } = req.params;

  try {
    res
      .status(200)
      .json({ message: `Updating the Promotion with id: ${promotionId}` });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.deletePromotionById = (req, res) => {
  const { promotionId } = req.params;

  try {
    res
      .status(200)
      .json({ message: `Deleting the Promotion with id: ${promotionId}` });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.promotionUnsupportedHandler = (req, res) => {
  res.status(404).json({ message: "This operation is not supported" });
};
