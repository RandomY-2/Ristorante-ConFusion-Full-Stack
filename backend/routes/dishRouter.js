const express = require("express");

const {
  getDishes,
  postDish,
  getDishById,
  updateDishById,
  deleteDishById,
  dishUnsupportedHandler,
} = require("../controllers/dishController");

dishRouter = express.Router();

dishRouter.get("/", getDishes);
dishRouter.post("/", postDish);
dishRouter.delete("/", dishUnsupportedHandler);
dishRouter.put("/", dishUnsupportedHandler);

dishRouter.get("/:dishId", getDishById);
dishRouter.post("/:dishId", dishUnsupportedHandler);
dishRouter.delete("/:dishId", deleteDishById);
dishRouter.put("/:dishId", updateDishById);

module.exports = dishRouter;
