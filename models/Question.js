const mongoose = require('mongoose');
const slugify = require('slugify');

const QuestionSchema = mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Please add a question.'],
    unique: true,
  },
  description: {
    type: String,
    trim: true,
    minLength: 250,
  },
  slug: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, "Please add a user"]
  }
});

QuestionSchema.pre('save', function () {
  this.slug = slugify(this.title, { lowercase: true });
});

const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;
