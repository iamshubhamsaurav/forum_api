const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
        required: [true, "Please confirm your password."],
        validate: {
            // This only works for onCreate or onSave. Will not work for update
            validator: function(el) {
                return this.el === this.password;
            },
            message: "Passwords are not the same!"
        }
    }
});

UserSchema.pre('save', async function(next) {
    // Only hash the password if the password was modified
    if (!this.isModified('password')) {
        return next();
    }
    //  Hashing the password
    this.password = await bcrypt.hash(this.password, 12);
    // Deleting the passwordConfirm.
    this.passwordConfirm = undefined;
    next();
})

const User = mongoose.model('User', UserSchema);

module.exports = User;