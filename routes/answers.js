const express = require('express');

const answerController = require('../controllers/answers');

const router = express.Router();

router.route('/').get(answerController.getAnswers).post(answerController.createAnswer);

router.route('/:id').get(answerController.getAnswer).put(answerController.updateAnswer).delete(answerController.deleteAnswer);

module.exports = router;