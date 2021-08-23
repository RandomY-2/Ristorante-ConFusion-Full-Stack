const Users = require("../models/user");
const authenticate = require("../authenticate");
const passport = require("passport");
const { restart } = require("nodemon");

module.exports.login = async (req, res) => {
  try {
    const user = await Users.findById(req.user._id);
    const token = authenticate.getToken({ _id: req.user._id });

    if (user.admin) {
      res
        .status(200)
        .json({ adminStatus: true, message: "You have logged in", token });
    } else {
      res
        .status(200)
        .json({ adminStatus: false, message: "You have logged in", token });
    }
  } catch (error) {
    res.status(503).json({ error: error.message });
  }
};

module.exports.register = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    await Users.register(new Users({ username }), password);
    await passport.authenticate("local")(req, res, next);
    res.status(200).json({ message: "You have successfully registered" });
  } catch (error) {
    res.status(503).json({ error: error.message });
  }
};

module.exports.getUsers = async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(503).json({ error: error.message });
  }
};
