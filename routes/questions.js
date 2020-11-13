const express = require('express');

const authController = require('../controllers/auth');

const questionController = require('../controllers/questions');
const answerRoute = require('./answers');

const router = express.Router();

router.use('/:questionId/answers', answerRoute);

router
  .route('/')
  .get(questionController.getQuestions)
  .post(authController.protect, questionController.createQuestion);

router
  .route('/:id')
  .get(questionController.getQuestion)
  .put(authController.protect, questionController.updateQuestion)
  .delete(authController.protect, questionController.deleteQuestion);

module.exports = router;
