const express = require("express");
const authenticate = require("../authenticate");
const {
  getFeedbacks,
  postFeedback,
} = require("../controllers/feedbackController");

const feedbackRouter = express.Router();

feedbackRouter.get(
  "/",
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  getFeedbacks
);
feedbackRouter.post("/", authenticate.verifyUser, postFeedback);

module.exports = feedbackRouter;
