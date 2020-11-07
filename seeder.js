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
        console.log(JSON.stringify(questions));
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
        console.log("Successfully Deleted Questions".green.inverse);
    } catch (err) {
        console.log('Error Destroying Questions'.red.inverse);
    }
}

if (process.argv[2] === '-sq') {
    showQuestion();
} else if (process.argv[2] === '-iq') {
    importQuestions();
} else if (process.argv[2] === '-dq') {
    destroyQuestions();
}