const mongoose = require('mongoose');

let conn;
const connectDB = async () => {
  //Mongoose 6 default: useNewUrlParser, useUnifiedTopology, and useCreateIndex are true, and useFindAndModify is false
  conn = await mongoose.connect(process.env.MONGO_URI, {});

  console.log(`MongoDB Connected: ${conn.connection.host}`);
};

module.exports = { connectDB, conn };
