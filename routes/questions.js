const express = require('express');

const questionController = require('../controllers/questions');

const router = express.Router();

router
  .route('/')
  .get(questionController.getQuestions)
  .post(questionController.createQuestion);

router
  .route('/:id')
  .get(questionController.getQuestion)
  .put(questionController.updateQuestion)
  .delete(questionController.deleteQuestion);

module.exports = router;
