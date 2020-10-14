const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const APIFeatures = require('../utils/apiFeatures');
const Question = require('../models/Question');
const Answer = require('../models/Answer');

// @route       : GET /api/v1/blogs/:id
// @desc        : Get a blog
// @access      : Public
exports.getAnswers = catchAsync (async (req, res, next) => {
    
});

// @route       : GET /api/v1/answers/:id
// @desc        : Get a blog
// @access      : Public
exports.getAnswer = async (req, res, next) => {
    const answer = await Answer.findById(req.params.id);
    if (!answer) {
        return next(new AppError(`No Answer found with id of ${req.params.id}`, 404));
    }
    const question = await Question.findById(answer.questionId);
    res.status(200).json({
        success: true,
        data: {
            question: question,
            answer: answer
        }
    });
};

// @route       : GET /api/v1/blogs/:id
// @desc        : Get a blog
// @access      : Public
exports.createAnswer = async (req, res, next) => {};

// @route       : GET /api/v1/blogs/:id
// @desc        : Get a blog
// @access      : Public
exports.updateAnswer = async (req, res, next) => {};

// @route       : GET /api/v1/blogs/:id
// @desc        : Get a blog
// @access      : Public
exports.deleteAnswer = async (req, res, next) => {};
