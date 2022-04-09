const mongoose = require('mongoose');

const connectDB = async () => {
  //Mongoose 6 default: useNewUrlParser, useUnifiedTopology, and useCreateIndex are true, and useFindAndModify is false
  const conn = await mongoose.connect(process.env.MONGO_URI, {});

  console.log(`MongoDB Connected: ${conn.connection.host}`);
};

module.exports = connectDB;
