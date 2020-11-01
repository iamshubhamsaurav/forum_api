const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = mongoose.Schema({
    name: { 
        type: String, 
        required: [true, "Please add your name"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Please add email address"],
        lowercase: true,
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email address"]
    },
    photo: String,
    password: {
        type: String,
        minLength: 8,
        required: [true, "Please add password"],
    },
    passwordConfirm: {
        type: String,
        required: [true, "Please confirm your password."]
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;