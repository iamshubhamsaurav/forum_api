const express = require('express');

const commentController = require('../controllers/comments');
const authController = require('../controllers/auth');

const router = express.Router({mergeParams : true});


router.route('/')
    .get(commentController.getCommentsByAnswer)
    .post(authController.protect, commentController.createComment);

router.route('/:id')
    .get(commentController.getComment)
    .put(authController.protect, commentController.updateComment)
    .delete(authController.protect, commentController.deleteComment);

module.exports = router;