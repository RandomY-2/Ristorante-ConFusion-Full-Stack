const mongoose = require('mongoose');
const passport = require('passport');
const Schema = mongoose.Schema;
const passportLocalMongooe = require('passport-local-mongoose');

const User = new Schema({
    firstname: {
        type: String,
        default: "",
    },
    lastname: {
        type: String,
        default: "",
    },
    admin: {
        type: Boolean, 
        default: false,
    }
});

User.plugin(passportLocalMongooe);

module.exports = mongoose.model('User', User);