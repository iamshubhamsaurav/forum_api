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
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, "Please confirm your password."],
        validate: {
            // This only works for onCreate or onSave. Will not work for update
            validator: function(el) {
                return el === this.password;
            },
            message: "Passwords are not the same!"
        }
    },
    passwordChangedAt: Date,
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

UserSchema.methods.correctPassword = async function(candiatePassword, userPassword) {
    // this.password will not work cause select: false
    return await bcrypt.compare(candiatePassword, userPassword);
}

UserSchema.methods.changedPasswordAfter = function(JWTTimeStamp) {
    if (this.passwordChangedAt) {
        
        const changedTimestamp = parseInt( this.passwordChangedAt.getTime() / 1000, 10);
    // console.log(changedTimestamp, JWTTimeStamp);
    return  JWTTimeStamp < changedTimestamp;
    // Checking if the passwordChangedAt is greater than the iat of incoming token 
    }
    return false;
}

const User = mongoose.model('User', UserSchema);

module.exports = User;