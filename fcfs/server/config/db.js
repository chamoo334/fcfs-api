const mongoose = require('mongoose');

const connectDB = async () => {
  //Mongoose 6 default: useNewUrlParser, useUnifiedTopology, and useCreateIndex are true, and useFindAndModify is false
  const conn = await mongoose
    .connect(process.env.MONGO_URI, {})
    .then(connData => {
      console.log(`MongoDB Connected: ${connData.connection.host}`);
    });
};

module.exports = connectDB;
