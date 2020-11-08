const express = require('express');

const answerController = require('../controllers/answers');

const router = express.Router({mergeParams: true});

router.route('/')
    .get(answerController.getAnswersByQuestion)
    .post(answerController.createAnswer);

router.route('/:id')
    .get(answerController.getAnswer)
    .put(answerController.updateAnswer)
    .delete(answerController.deleteAnswer);

module.exports = router;