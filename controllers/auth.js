const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');


exports.signup = catchAsync(async (req, res, next) => {
    const user = await User.create(req.body);
    res.status(200).json({
        success: true,
        data: user,
    })
})