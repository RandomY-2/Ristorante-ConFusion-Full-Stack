const mongoose = require("mongoose");
const Promotions = require("../models/promotions");

module.exports.getPromotions = async (req, res) => {
  try {
    const promotions = await Promotions.find();
    res.status(200).json(promotions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.postPromotion = async (req, res) => {
  try {
    const promotion = req.body;
    const newPromotion = new Promotions(promotion);

    await newPromotion.save();
    res.status(200).json(newPromotion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.getPromotionById = async (req, res) => {
  try {
    const { promotionId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(promotionId)) {
      return res.status(404).json({
        error: "No promotion with the given id",
      });
    }

    const promotion = await Promotions.findById(promotionId);
    res.status(200).json(promotion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.updatePromotionById = async (req, res) => {
  try {
    const { promotionId } = req.params;
    const newPromotion = req.body;

    if (!mongoose.Types.ObjectId.isValid(promotionId)) {
      return res.status(404).json({
        error: "No promotion with the given id",
      });
    }

    const updatedPromotion = await Promotions.findByIdAndUpdate(
      promotionId,
      newPromotion,
      {
        new: true,
      }
    );
    res.status(200).json(updatedPromotion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.deletePromotionById = async (req, res) => {
  try {
    const { promotionId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(promotionId)) {
      return res.status(404).json({
        error: "No promotion with the given id",
      });
    }

    await Promotions.findByIdAndDelete(promotionId);
    res.status(200).json({ message: "Promotion successfully deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.promotionUnsupportedHandler = (req, res) => {
  res.status(404).json({ message: "This operation is not supported" });
};
