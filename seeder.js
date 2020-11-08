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
const answers = JSON.parse(fs.readFileSync(`./_data/answers.json`, 'utf-8'));

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
        console.log("Successfully Imported Questions".green.inverse);
    } catch (err) {
        console.log(err);
        console.log("Error Importing Questions".red.inverse);
    }
    process.exit();
}

const destroyQuestions = async () => {
    try {
        await Question.deleteMany();
        console.log("Successfully Destroyed Questions".green.inverse);
    } catch (err) {
        console.log('Error Destroying Questions'.red.inverse);
    }
    process.exit();
}

const showAnswers = async () => {
    try {
        const answers = await Answer.find();
        console.log(answers);
    } catch (err) {
        console.log('Error Showing Questions'.red.inverse);
    }
    process.exit();
}

const importAnswers = async () => {
    try {
        await Answer.create(answers);
        console.log("Successfully Importing Answers".green.inverse);
    } catch (err) {
        console.log('Error Importing Answers'.red.inverse);
    }
    process.exit();
}

const destroyAnswers = async () => {
    try {
        await Answer.deleteMany();
        console.log("Successfully Destroyed Answers".green.inverse);
    } catch (err) {
        console.log('Error Destroying Answers'.red.inverse);
    }
    process.exit();
}

if (process.argv[2] === '-sq') {
    showQuestion();
} else if (process.argv[2] === '-iq') {
    importQuestions();
} else if (process.argv[2] === '-dq') {
    destroyQuestions();
} else if (process.argv[2] === '-sa') {
    showAnswers();
} else if (process.argv[2] === '-ia') {
    importAnswers();
} else if (process.argv[2] === '-da') {
    destroyAnswers();
}