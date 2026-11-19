const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    password: {
        type: String,
        required: [true, 'User Password is Required']
    },
    email: {
        type: String,
        required: [true, 'Email is Required']
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
});

module.exports = mongoose.model('User', userSchema);