const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/apiError');
const Question = require('../models/Question');
const Answer = require('../models/Answer');

// @route       : GET /api/v1/question/:questionId/answers
// @desc        : Get Answers using questionId
// @access      : Public
exports.getAnswersByQuestion = catchAsync (async (req, res, next) => {
    const answers = await Answer.find({questionId: req.params.questionId});
    res.status(200).json({
        success: true,
        count: answers.length,
        data: answers,
    })
});

// @route       : GET /api/v1/answers/:id
// @desc        : Get a Answer
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

// @route       : POST /api/v1/answers
// @desc        : Create An Answer
// @access      : Private
exports.createAnswer = async (req, res, next) => {
    const answer = await Answer.create(req.body);
    res.status(200).json({
        success: answer,
        data: answer
    });
};

// @route       : PUT /api/v1/answers/:id
// @desc        : Update an answer
// @access      : Private
exports.updateAnswer = async (req, res, next) => {
    const answer = await Answer.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    if (!answer) {
        return next(new AppError(`Answer not found with the id of ${req.params.id}`, 404));
    }
    res.status(200).json({
        success: true,
        data: answer,
    })
};

// @route       : DELETE /api/v1/answers/:id
// @desc        : Delete an answer
// @access      : Private
exports.deleteAnswer = async (req, res, next) => {
    const answer = await Answer.findByIdAndDelete(req.params.id);
    if (!answer) {
        return next(new AppError(`Answer not found with the id of ${req.params.id}`, 404));
    }
    res.status(200).json({
        success: true, 
        data: {},
    })
};
