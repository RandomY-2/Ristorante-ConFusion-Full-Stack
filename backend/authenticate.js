const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Users = require("./models/user");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const jwt = require("jsonwebtoken");
const config = require("./config.js");

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = config.secretKey;

module.exports.local = passport.use(new LocalStrategy(Users.authenticate()));
passport.serializeUser(Users.serializeUser());
passport.deserializeUser(Users.deserializeUser());

module.exports.getToken = (user) => {
  return jwt.sign(user, config.secretKey, { expiresIn: 3600 });
};

module.exports.jwtPassport = passport.use(
  new JwtStrategy(options, (jwt_payload, done) => {
    Users.findOne({ _id: jwt_payload._id }, (err, user) => {
      if (err) {
        return done(err, false);
      } else if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

module.exports.verifyUser = passport.authenticate("jwt", { session: false });

module.exports.verifyAdmin = async (req, res, next) => {
  try {
    const user = await Users.findById(req.user._id);

    if (user.admin) {
      next();
    } else {
      res
        .status(400)
        .json({ error: "You are not authorized to perform this operation" });
    }
  } catch (error) {
    res.status(503).json({ error: error.message });
  }
};
