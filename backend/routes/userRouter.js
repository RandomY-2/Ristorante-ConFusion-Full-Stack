const express = require("express");
const passport = require("passport");
const { login, register } = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/login", passport.authenticate("local"), login);
userRouter.post("/register", register);

module.exports = userRouter;
