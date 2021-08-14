const express = require("express");

const {
  getPromotions,
  postPromotion,
  getPromotionById,
  deletePromotionById,
  updatePromotionById,
  promotionUnsupportedHandler,
} = require("../controllers/promoController");

const promoRouter = express.Router();

promoRouter.get("/", getPromotions);
promoRouter.post("/", postPromotion);
promoRouter.put("/", promotionUnsupportedHandler);
promoRouter.delete("/", promotionUnsupportedHandler);

promoRouter.get("/:promotionId", getPromotionById);
promoRouter.post("/:promotionId", promotionUnsupportedHandler);
promoRouter.delete("/:promotionId", deletePromotionById);
promoRouter.put("/:promotionId", updatePromotionById);

module.exports = promoRouter;
