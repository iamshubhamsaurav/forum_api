const AppError = require('./apiError');

const sendDevelopmentError = (err, res) => {
  res.status(err.statusCode).json({
    message: err.message,
    stack: err.stack,
    stack: err.stack,
    error: err,
  });
};

const sendProductionError = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      success: err.status,
      message: err.message,
    });
  } else {
    console.log('ERROR: ', err);
    res
      .status(500)
      .json({ status: 'error', message: 'Something went very wrong!' });
  }
};

handleCastError = (error) => {
  const message = `Invalid ${error.path}: ${err.value}`;
  return new AppError(message, 400);
};

handleDuplicationError = (error) => {
  const value = error.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
  const message = `Duplicate field value entered: ${value}. Please enter a different value`;
  return new AppError(message, 400);
};

handleValidationError = (error) => {
  const errors = Object.values(error.errors).map((el) => el.message);
  const message = `Invalid Input Data: ${errors.join('. ')}`;
  return new AppError(message, 400);
};

module.exports = (err, res, req, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendDevelopmentError(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };

    if (err.name === 'CastError') error = handleCastError(error);
    if (err.code === 11000) error = handleDuplicationError(error);
    if (err.name === 'ValidationError') error = handleValidationError(error);

    sendProductionError(error, res);
  }
};
