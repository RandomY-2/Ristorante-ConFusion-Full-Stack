const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const authenticate = require("./authenticate");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

const userRouter = require("./routes/userRouter");
const dishRouter = require("./routes/dishRouter");
const promoRouter = require("./routes/promoRouter");
const leaderRouter = require("./routes/leaderRouter");

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());

app.use("/users", userRouter);
app.use("/dishes", dishRouter);
app.use("/promotions", promoRouter);
app.use("/leaders", leaderRouter);

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Server running on port 5000...");
    });
  })
  .catch((error) => {
    console.log(error);
  });

mongoose.set("useFindAndModify", false);
