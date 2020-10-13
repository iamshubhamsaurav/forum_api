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
    }
});

const Answer = mongoose.model('Answer', AnswerSchema);

module.exports = Answer;