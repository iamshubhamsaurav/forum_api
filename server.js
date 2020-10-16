const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

const errorHandler = require('./utils/errorHandler');

const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env' });
connectDB();

const questionRoute = require('./routes/questions');
const answerRoute = require('./routes/answers');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/questions', questionRoute);
app.use('/api/v1/answers', answerRoute);

app.all('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: '404NotFound',
    error: 'Resource does not exists.',
  });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log('Listening to server on port ' + PORT));
