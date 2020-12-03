const Comment = require('../models/Comment');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/apiError');

// @route:       GET /api/v1/answers/:answerId/comments/
// @desc:        Create a comment.
// @access:      Public
const getCommentByAnswer = catchAsync(async (req, res, next) => {});

// @route:       GET /api/v1/comments/:id
// @desc:        Get a comment.
// @access:      Public
const getComment = catchAsync(async (req, res, next) => {});

// @route:       POST /api/v1/answers/:answerId/comments/
// @desc:        Create a comment.
// @access:      Private
const createComment = catchAsync(async (req, res, next) => {});

// @route:       PATCH /api/v1/comments/:id
// @desc:        Update a comment.
// @access:      Private
const updateComment = catchAsync(async (req, res, next) => {});

// @route:       DELETE /api/v1/comments/:id
// @desc:        Delete a comment.
// @access:      Private
const deleteComment = catchAsync(async (req, res, next) => {});
