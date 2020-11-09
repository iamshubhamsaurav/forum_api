const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

const AppError = require('./utils/apiError');
const errorHandler = require('./utils/errorHandler');

const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env' });
connectDB();

const questionRoute = require('./routes/questions');
const answerRoute = require('./routes/answers');
const userRoute = require('./routes/users');

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/questions', questionRoute);
app.use('/api/v1/answers', answerRoute);
app.use('/api/v1/users', userRoute);

app.all('*', (req, res, next) => {
  return next(new AppError(`Resource ${req.originalUrl} not found on the server`, 404));
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log('Listening to server on port ' + PORT));
