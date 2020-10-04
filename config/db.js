const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = () => {
  const connection = mongoose.connect(process.env.MONDO_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
  console.log(
    `Database connected: ${connection.connection.host}`.cyan.underline.bold
  );
};

module.exports = connectDB;
