const express = require("express");
const passport = require("passport");
const authenticate = require("../authenticate");
const { login, register, getUsers } = require("../controllers/userController");

const userRouter = express.Router();

userRouter.get(
  "/",
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  getUsers
);
userRouter.post("/login", passport.authenticate("local"), login);
userRouter.post("/register", register);

module.exports = userRouter;
