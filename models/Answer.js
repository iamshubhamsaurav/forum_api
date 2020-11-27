const mongoose = require('mongoose');
const AnswerSchema = mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    questionId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Question',
        required: [true, "Please add a question Id"]
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, "Please add a user"]
    }
});

const Answer = mongoose.model('Answer', AnswerSchema);

module.exports = Answer;