const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async () => {
  const connection = await mongoose.connect(process.env.MONGO_URL, {
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
