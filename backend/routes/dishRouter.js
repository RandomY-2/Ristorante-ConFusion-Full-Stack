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
dishRouter.post(
  "/",
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  postDish
);
dishRouter.put(
  "/",
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  dishUnsupportedHandler
);
dishRouter.delete(
  "/",
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  dishUnsupportedHandler
);

dishRouter.get("/:dishId", authenticate.verifyUser, getDishById);
dishRouter.post(
  "/:dishId",
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  dishUnsupportedHandler
);
dishRouter.put(
  "/:dishId",
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  updateDishById
);
dishRouter.delete(
  "/:dishId",
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  deleteDishById
);

dishRouter.get("/:dishId/comments", authenticate.verifyUser, getDishComments);
dishRouter.post(
  "/:dishId/comments",
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  postDishComment
);
dishRouter.put(
  "/:dishId/comments",
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  dishUnsupportedHandler
);
dishRouter.delete(
  "/:dishId/comments",
  authenticate.verifyUser,
  authenticate.verifyAdmin,
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
  authenticate.verifyAdmin,
  dishUnsupportedHandler
);
dishRouter.put(
  "/:dishId/comments/:commentId",
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  updateDishComment
);
dishRouter.delete(
  "/:dishId/comments/:commentId",
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  deleteDishComment
);

module.exports = dishRouter;
