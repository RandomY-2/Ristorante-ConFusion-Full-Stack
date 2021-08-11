const express = require("express");
const morgan = require("morgan");
const app = express();

const dishRouter = require("./routes/dishRouter");
const promoRouter = require("./routes/promoRouter");
const leaderRouter = require("./routes/leaderRouter");

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));

app.use("/dishes", dishRouter);
app.use("/promotions", promoRouter);
app.use("/leaders", leaderRouter);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
