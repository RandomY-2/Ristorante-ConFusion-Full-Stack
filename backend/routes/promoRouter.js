const express = require("express");
const authenticate = require("../authenticate");
const {
  getPromotions,
  postPromotion,
  getPromotionById,
  deletePromotionById,
  updatePromotionById,
  promotionUnsupportedHandler,
} = require("../controllers/promoController");

const promoRouter = express.Router();

promoRouter.get("/", authenticate.verifyUser, getPromotions);
promoRouter.post(
  "/",
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  postPromotion
);
promoRouter.put(
  "/",
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  promotionUnsupportedHandler
);
promoRouter.delete(
  "/",
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  promotionUnsupportedHandler
);

promoRouter.get("/:promotionId", authenticate.verifyUser, getPromotionById);
promoRouter.post(
  "/:promotionId",
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  promotionUnsupportedHandler
);
promoRouter.put(
  "/:promotionId",
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  updatePromotionById
);
promoRouter.delete(
  "/:promotionId",
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  deletePromotionById
);

module.exports = promoRouter;
