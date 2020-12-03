const Comment = require('../models/Comment');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/apiError');

// @route:       GET /api/v1/answers/:answerId/comments/
// @desc:        Create a comment.
// @access:      Public
const getCommentsByAnswer = catchAsync(async (req, res, next) => {
    const comments = await Comment.find({answer: req.params.answerId});
    res.status(200).json({
        success: true,
        count: comments.length,
        data: comments
    })
});

// @route:       GET /api/v1/comments/:id
// @desc:        Get a comment.
// @access:      Public
const getComment = catchAsync(async (req, res, next) => {
    const comment = await Comment.findById(req.params.id);
    if(!comment) {
        return next(new AppError(`No Comment found with the id of ${req.params.id}`, 404));
    }
    res.status(200).json({
        success: true,
        data: comment,
    })
});

// @route:       POST /api/v1/answers/:answerId/comments/
// @desc:        Create a comment.
// @access:      Private
const createComment = catchAsync(async (req, res, next) => {
    if(!req.body.answer) {
        return next(new AppError('Comment must have an answer', 400));
    }
    req.body.user = req.user._id;
    const comment = await Comment.create(req.body);
    res.status(201).json({
        success: true,
        data: comment,
    })
});

// @route:       PATCH /api/v1/comments/:id
// @desc:        Update a comment.
// @access:      Private
const updateComment = catchAsync(async (req, res, next) => {
    if (req.body.answer) {
        return next(new AppError('You cannot change the answer propetry', 400));
    }
    if (req.body.user) {
        return next(new AppError('You cannot change the user propetry', 400));
    }
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
        return next(new AppError(`No Comment found with id ${req.params.id}`, 404));
    }
    const freshComment = await Comment.findByIdAndUpdate(req.params.id,req.body, {
        new: true,
        runValidators: true,
    })
    res.status(200).json({
        success: true,
        data: freshComment
    })
});

// @route:       DELETE /api/v1/comments/:id
// @desc:        Delete a comment.
// @access:      Private
const deleteComment = catchAsync(async (req, res, next) => {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
        return next(new AppError(`No Comment found with id ${req.params.id}`, 404));
    }
    await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json({
        success: true,
        data: null,
    })
});
