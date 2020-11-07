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

const questions = JSON.parse(fs.readFileSync(`./_data/questions.json`, 'utf-8'));

const showQuestion = async () => {
    try{
        const questions = await Question.find();
        console.log(questions);
    } catch(err) {
        console.log(err);
    }
    process.exit();
}

const importQuestions = async () => {
    try {
        await Question.create(questions);
    } catch (err) {
        console.log(err);
    }

}

if (process.argv[2] === '-sq') {
    showQuestion();
} else if (process.argv[2] === '-iq') {
    importQuestions();
}