const express = require("express");
const authenticate = require("../authenticate");
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

const dishRouter = express.Router();

dishRouter.get("/", authenticate.verifyUser, getDishes);
dishRouter.post("/", authenticate.verifyUser, postDish);
dishRouter.delete("/", authenticate.verifyUser, dishUnsupportedHandler);
dishRouter.put("/", authenticate.verifyUser, dishUnsupportedHandler);

dishRouter.get("/:dishId", authenticate.verifyUser, getDishById);
dishRouter.post("/:dishId", authenticate.verifyUser, dishUnsupportedHandler);
dishRouter.delete("/:dishId", authenticate.verifyUser, deleteDishById);
dishRouter.put("/:dishId", authenticate.verifyUser, updateDishById);

dishRouter.get("/:dishId/comments", authenticate.verifyUser, getDishComments);
dishRouter.post("/:dishId/comments", authenticate.verifyUser, postDishComment);
dishRouter.put(
  "/:dishId/comments",
  authenticate.verifyUser,
  dishUnsupportedHandler
);
dishRouter.delete(
  "/:dishId/comments",
  authenticate.verifyUser,
  deleteDishComments
);

dishRouter.get(
  "/:dishId/comments/:commentId",
  authenticate.verifyUser,
  getDishComment
);
dishRouter.post(
  "/:dishId/comments/:commentId",
  authenticate.verifyUser,
  dishUnsupportedHandler
);
dishRouter.put(
  "/:dishId/comments/:commentId",
  authenticate.verifyUser,
  updateDishComment
);
dishRouter.delete(
  "/:dishId/comments/:commentId",
  authenticate.verifyUser,
  deleteDishComment
);

module.exports = dishRouter;
