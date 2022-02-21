const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    username: String,
    email: String,

    password: String,
    phone: String,
}, {
    timestamps: true
}); module.exports = mongoose.model('user', userSchema)