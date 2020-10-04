const Question = require('../models/Question');

// @route:       GET /api/v1/questions/
// @desc:        Get all question.
// @access:      Public
exports.getQuestions = async (req, res, next) => {
  try {
    const questions = await Question.find();
    res
      .status(200)
      .json({ success: true, count: questions.length, data: questions });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message, error });
  }
};

// @route:       GET /api/v1/questions/:id
// @desc:        Get a question.
// @access:      Public
exports.getQuestion = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      res.status(404).json({
        success: false,
        message: '404NotFound',
        error: `Question with that id ${req.params.id} found`,
      });
    }
    res.status(200).json({ success: true, data: question });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message, error });
  }
};

// @route:       POST /api/v1/questions/
// @desc:        Create a question.
// @access:      Private
exports.createQuestion = async (req, res, next) => {
  try {
    const question = await Question.create(req.body);
    res.status(201).json({ success: true, data: question });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message, error });
  }
};

// @route:       PUT /api/v1/questions/:id
// @desc:        Update a question.
// @access:      Private
exports.updateQuestion = async (req, res, next) => {
  try {
    const question = await Question.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!question) {
      res.status(400).json({
        success: false,
        message: '404NotFound',
        error: `Question not found with the id of ${req.params.id}`,
      });
    }
    res.status(200).json({ success: true, data: question });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message, error });
  }
};

// @route:       DELETE /api/v1/questions/:id
// @desc:        Delete a question.
// @access:      Private
exports.deleteQuestion = async (req, res, next) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);
    if (!question) {
      res.status(200).json({
        success: false,
        message: '404NotFound',
        error: `Question not found with the id: ${req.params.id}`,
      });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message, error });
  }
};
