const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/apiError');

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    })
}

exports.signup = catchAsync(async (req, res, next) => {
    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password, 
        passwordConfirm: req.body.passwordConfirm,
    });

    // const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
    //     expiresIn: process.env.JWT_EXPIRES_IN,
    // });

    const token = signToken(user._id);

    res.status(200).json({
        success: true,
        data: user,
        token: token,
    })
})

exports.login = catchAsync(async (req, res, next) => {
    const {email, password} = req.body;
    //Check if email and password exist
    if (!email || !password) {
        return next(new AppError(`Please provide an email and password`, 400));
    }
    // Check if the user exists and password is correct
    const user = await User.findOne({email}).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
        // 401 stands for not authenticated
        return next(new AppError(`Incorrect Email or Password`, 401));
    }
    // If elerything Ok send back the jsonwebtoken
    const token  = signToken(user._id); // Signing the token

    res.status(200).json({
        success: true,
        token
    })
})