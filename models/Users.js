const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        set: (password) =>
            bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
})
module.exports.UserModel = mongoose.model('user', User);
module.exports.UserSchema = User;