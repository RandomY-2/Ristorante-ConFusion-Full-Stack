const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const Users = new mongoose.Schema({
  admin: {
    type: Boolean,
    default: false,
  },
});

Users.plugin(passportLocalMongoose);
module.exports = mongoose.model("Users", Users);
