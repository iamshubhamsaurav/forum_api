const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Models
const Question = require('./models/Question');
const Answer = require('./models/Answer');
const User = require('./models/User');

dotenv.config({path: './config/config.env'});

mongoose.connect(process.env.MONGO_URL, {
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

const questions = JSON.parse(fs.readFileSync(`./_data/questions.json`, 'utf-8'));
const answers = JSON.parse(fs.readFileSync(`./_data/answers.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`./_data/users.json`, 'utf-8'));

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
        console.log("Successfully Imported Answers".green.inverse);
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

const showUsers = async () => {
    try {
        const users = await User.find();
        console.log(users);
    } catch (err) {
        console.log('Error Showing Users'.red.inverse);
    }
    process.exit();
}

const importUsers = async () => {
    try {
        await User.create(users);
        console.log('Successfully Imported Users'.green.inverse);
    } catch (err) {
        console.log('Error Importing Users'.red.inverse);
    }
    process.exit();
}

const destroyUsers = async () => {
    try {
        await User.deleteMany();
        console.log('Successfully Destroyed Users'.green.inverse);
    } catch (err) {
        console.log('Error Destroying Users'.red.inverse);
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
} else if (process.argv[2] === '-su') {
    showUsers();
} else if (process.argv[2] === '-iu') {
    importUsers();
} else if (process.argv[2] === '-du') {
    destroyUsers();
}