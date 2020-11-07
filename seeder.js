const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Models
const Question = require('./models/Question');
const Answer = require('./models/Answer');

dotenv.config({path: './config/config.env'});

mongoose.connect(process.env.MONGO_URL, {
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

const showQuestion = async () => {
    try{
        const questions = await Question.find();
        console.log(questions);
    } catch(err) {
        console.log(err);
    }
}

if (process.argv[2] === '-sq') {
    showQuestion();
}