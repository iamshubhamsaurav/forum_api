const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    text: {
        type: String,
        required: [true, "Please add a text date"],
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
        required: [true, "Please add a update date of the comment"],
    },
    answer: {
        type: mongoose.Schema.ObjectId,
        ref: 'Answer',
        required: [true, "Please add an answer"],
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, "Please add a user"],
    },
    replyTo: {
        type: mongoose.Schema.ObjectId,
        ref: 'Comment',
    },
});

module.exports = mongoose.model('Comment', CommentSchema);