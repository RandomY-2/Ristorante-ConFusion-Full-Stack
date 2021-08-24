const express = require("express");
const passport = require("passport");
const authenticate = require("../authenticate");
const {
  login,
  register,
  getUsers,
  checkAdminStatus,
} = require("../controllers/userController");
const user = require("../models/user");

const userRouter = express.Router();

userRouter.get(
  "/",
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  getUsers
);
userRouter.post("/login", passport.authenticate("local"), login);
userRouter.post("/register", register);
userRouter.post("/checkAdmin", authenticate.verifyUser, checkAdminStatus);

module.exports = userRouter;
