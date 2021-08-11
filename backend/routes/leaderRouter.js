const express = require("express");

const {
  getLeaders,
  postLeader,
  getLeaderById,
  deleteLeaderById,
  updateLeaderById,
  leaderUnsupportedHandler,
} = require("../controllers/leaderController");

leaderRouter = express.Router();

leaderRouter.get("/", getLeaders);
leaderRouter.post("/", postLeader);
leaderRouter.delete("/", leaderUnsupportedHandler);
leaderRouter.put("/", leaderUnsupportedHandler);

leaderRouter.get("/:leaderId", getLeaderById);
leaderRouter.post("/:leaderId", leaderUnsupportedHandler);
leaderRouter.delete("/:leaderId", deleteLeaderById);
leaderRouter.put("/:leaderId", updateLeaderById);

module.exports = leaderRouter;
