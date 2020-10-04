const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config({ path: './config/config.env' });

const questionRoute = require('./routes/questions');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/questions', questionRoute);

app.all('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: '404NotFound',
    error: 'Resource does not exists.',
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log('Listening to server on port ' + PORT));
