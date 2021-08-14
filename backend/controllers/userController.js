const Users = require("../models/user");
const authenticate = require("../authenticate");
const passport = require("passport");

module.exports.login = async (req, res, next) => {
  try {
    const token = authenticate.getToken({ _id: req.user._id });
    res.status(200).json({ message: "You have logged in", token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.register = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    await Users.register(new Users({ username }), password);
    await passport.authenticate("local")(req, res, next);

    res.status(200).json({ message: "You have successfully registered" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
