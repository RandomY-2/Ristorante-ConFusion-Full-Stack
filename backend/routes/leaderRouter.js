const express = require("express");
const authenticate = require("../authenticate");
const {
  getLeaders,
  postLeader,
  getLeaderById,
  deleteLeaderById,
  updateLeaderById,
  leaderUnsupportedHandler,
} = require("../controllers/leaderController");

const leaderRouter = express.Router();

leaderRouter.get("/", authenticate.verifyUser, getLeaders);
leaderRouter.post(
  "/",
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  postLeader
);
leaderRouter.put(
  "/",
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  leaderUnsupportedHandler
);
leaderRouter.delete(
  "/",
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  leaderUnsupportedHandler
);

leaderRouter.get("/:leaderId", authenticate.verifyUser, getLeaderById);
leaderRouter.post(
  "/:leaderId",
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  leaderUnsupportedHandler
);
leaderRouter.put(
  "/:leaderId",
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  updateLeaderById
);
leaderRouter.delete(
  "/:leaderId",
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  deleteLeaderById
);

module.exports = leaderRouter;
