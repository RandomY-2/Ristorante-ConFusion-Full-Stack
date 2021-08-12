const express = require("express");

const {
  getDishes,
  postDish,
  getDishById,
  updateDishById,
  deleteDishById,
  dishUnsupportedHandler,
  getDishComments,
  postDishComment,
  deleteDishComments,
  getDishComment,
  updateDishComment,
  deleteDishComment,
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

dishRouter.get("/:dishId/comments", getDishComments);
dishRouter.post("/:dishId/comments", postDishComment);
dishRouter.put("/:dishId/comments", dishUnsupportedHandler);
dishRouter.delete("/:dishId/comments", deleteDishComments);

dishRouter.get("/:dishId/comments/:commentId", getDishComment);
dishRouter.post("/:dishId/comments/:commentId", dishUnsupportedHandler);
dishRouter.put("/:dishId/comments/:commentId", updateDishComment);
dishRouter.delete("/:dishId/comments/:commentId", deleteDishComment);

module.exports = dishRouter;
