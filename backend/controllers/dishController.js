module.exports.getDishes = (req, res) => {
  try {
    res.status(200).json({ message: "Getting Dishes" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.postDish = (req, res) => {
  const { name, id } = req.body;

  try {
    res.status(200).json({ message: "Creating Dish", name, id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.getDishById = (req, res) => {
  const { dishId } = req.params;

  try {
    res.status(200).json({ message: `Getting the dish with id: ${dishId}` });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.updateDishById = (req, res) => {
  const { dishId } = req.params;

  try {
    res.status(200).json({ message: `Updating the dish with id: ${dishId}` });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.deleteDishById = (req, res) => {
  const { dishId } = req.params;

  try {
    res.status(200).json({ message: `Deleting the dish with id: ${dishId}` });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.dishUnsupportedHandler = (req, res) => {
  res.status(404).json({ message: "This operation is not supported" });
};
