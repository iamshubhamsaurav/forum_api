const Question = require('../models/Question');
const Answer = require('../models/Answer');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/apiError');
const APIFeatures = require('../utils/apiFeatures');

// @route:       GET /api/v1/questions/
// @desc:        Get all question.
// @access:      Public
exports.getQuestions = catchAsync( async (req, res, next) => {
  const features = new APIFeatures(Question.find(), req.query).sort().filter().limitField().paginate();

  const questions = await features.query;
    res
      .status(200)
      .json({ success: true, count: questions.length, data: questions });
});

// @route:       GET /api/v1/questions/:id
// @desc:        Get a question.
// @access:      Public
exports.getQuestion = catchAsync( async (req, res, next) => {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return next(new AppError(`No Question found with id ${req.params.id}`, 404));
    }
    const answers = await Answer.find({questionId: req.params.id});
    res.status(200).json({ success: true, data: {
      question,
      answers
    } });
});

// @route:       POST /api/v1/questions/
// @desc:        Create a question.
// @access:      Private
exports.createQuestion = catchAsync(async (req, res, next) => {
  const question = await Question.create(req.body);
  res.status(201).json({ success: true, data: question });
});

// @route:       PUT /api/v1/questions/:id
// @desc:        Update a question.
// @access:      Private
exports.updateQuestion = catchAsync( async (req, res, next) => {
    const question = await Question.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!question) {
      return next(new AppError(`No Question found with id ${req.params.id}`, 404));
    }
    res.status(200).json({ success: true, data: question });
});

// @route:       DELETE /api/v1/questions/:id
// @desc:        Delete a question.
// @access:      Private
exports.deleteQuestion = catchAsync( async (req, res, next) => {
    const question = await Question.findByIdAndDelete(req.params.id);
    if (!question) {
      return next(new AppError(`No Question found with id ${req.params.id}`, 404));
    }
    res.status(200).json({ success: true, data: {} });
});
