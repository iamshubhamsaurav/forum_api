const express = require('express');
const authController = require('../controllers/auth');

const answerController = require('../controllers/answers');

const router = express.Router({mergeParams: true});

const commentRoute = require('../routes/comments');

router.use('/:answerId/comments', commentRoute);

router.route('/')
    .get(answerController.getAnswersByQuestion)
    .post(authController.protect, answerController.createAnswer);

router.route('/:id')
    .get(answerController.getAnswer)
    .put(authController.protect, answerController.updateAnswer)
    .delete(authController.protect, answerController.deleteAnswer);

module.exports = router;