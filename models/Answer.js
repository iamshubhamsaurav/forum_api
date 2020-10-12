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
    answerId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Question',
    }
});

const Answer = mongoose.model('Answer', AnswerSchema);

module.exports = Answer;