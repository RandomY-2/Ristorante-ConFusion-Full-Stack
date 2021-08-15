const mongoose = require("mongoose");
const Dishes = require("../models/dish");

module.exports.getDishes = async (req, res) => {
  try {
    const dishes = await Dishes.find();
    res.status(200).json(dishes);
  } catch (error) {
    res.status(503).json({ error: error.message });
  }
};

module.exports.postDish = async (req, res) => {
  try {
    const dish = req.body;
    const newDish = new Dishes(dish);

    await newDish.save();
    res.status(200).json(newDish);
  } catch (error) {
    res.status(503).json({ error: error.message });
  }
};

module.exports.getDishById = async (req, res) => {
  try {
    const { dishId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(dishId)) {
      return res.status(404).json({
        error: "No dish with the given id",
      });
    }

    const returnedDish = await Dishes.findById(dishId);
    res.status(200).json(returnedDish);
  } catch (error) {
    res.status(503).json({ error: error.message });
  }
};

module.exports.updateDishById = async (req, res) => {
  try {
    const { dishId } = req.params;
    const newDish = req.body;

    if (!mongoose.Types.ObjectId.isValid(dishId)) {
      return res.status(404).json({
        error: "No dish with the given id",
      });
    }

    const updatedDish = await Dishes.findByIdAndUpdate(dishId, newDish, {
      new: true,
    });
    await updatedDish.save();
    res.status(200).json(updatedDish);
  } catch (error) {
    res.status(503).json({ error: error.message });
  }
};

module.exports.deleteDishById = async (req, res) => {
  try {
    const { dishId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(dishId)) {
      return res.status(404).json({
        error: "No dish with the given id",
      });
    }

    await Dishes.findByIdAndDelete(dishId);
    res.status(200).json({ message: "Dish successfully deleted" });
  } catch (error) {
    res.status(503).json({ error: error.message });
  }
};

module.exports.dishUnsupportedHandler = (req, res) => {
  res.status(403).json({ error: "This operation is not supported" });
};

module.exports.getDishComments = async (req, res) => {
  try {
    const { dishId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(dishId)) {
      return res.status(404).json({
        error: "No dish with the given id",
      });
    }

    const dish = await Dishes.findById(dishId);
    const returnedComments = dish.comments;
    res.status(200).json(returnedComments);
  } catch (error) {
    res.status(503).json({ error: error.message });
  }
};

module.exports.postDishComment = async (req, res) => {
  try {
    const { dishId } = req.params;
    const newComment = req.body;

    if (!mongoose.Types.ObjectId.isValid(dishId)) {
      return res.status(404).json({
        error: "No dish with the given id",
      });
    }

    const dish = await Dishes.findById(dishId);
    dish.comments.push(newComment);
    await dish.save();
    res.status(200).json(dish.comments);
  } catch (error) {
    res.status(503).json({ error: error.message });
  }
};

module.exports.deleteDishComments = async (req, res) => {
  try {
    const { dishId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(dishId)) {
      return res.status(404).json({
        error: "No dish with the given id",
      });
    }

    const dish = await Dishes.findById(dishId);
    dish.comments = [];
    await dish.save();
    res.status(200).json(dish.comments);
  } catch (error) {
    res.status(503).json({ error: error.message });
  }
};

module.exports.getDishComment = async (req, res) => {
  try {
    const { dishId, commentId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(dishId)) {
      return res.status(404).json({
        error: "No dish with the given id",
      });
    }

    const dish = await Dishes.findById(dishId);
    const comment = dish.comments.filter((comment) => {
      return comment.id === commentId;
    })[0];

    res.status(200).json(comment);
  } catch (error) {
    res.status(503).json({ error: error.message });
  }
};

module.exports.updateDishComment = async (req, res) => {
  try {
    const { dishId, commentId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(dishId)) {
      return res.status(404).json({
        error: "No dish with the given id",
      });
    }

    const dish = await Dishes.findById(dishId);
    if (req.body.rating) {
      dish.comments.id(commentId).rating = req.body.rating;
    }
    if (req.body.comment) {
      dish.comments.id(commentId).comment = req.body.comment;
    }
    if (req.body.author) {
      dish.comments.id(commentId).author = req.body.author;
    }
    await dish.save();
    res.status(200).json({ message: "comment updated" });
  } catch (error) {
    res.status(503).json({ error: error.message });
  }
};

module.exports.deleteDishComment = async (req, res) => {
  try {
    const { dishId, commentId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(dishId)) {
      return res.status(404).json({
        error: "No dish with the given id",
      });
    }

    const dish = await Dishes.findById(dishId);
    dish.comments = dish.comments.filter((comment) => {
      return comment.id !== commentId;
    });
    await dish.save();
    res.status(200).json({ message: "Comment deleted" });
  } catch (error) {
    res.status(503).json({ error: error.message });
  }
};
