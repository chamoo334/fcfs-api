const apiv1 = require('./routes/apiv1');
const connectDB = require('./config/db');
const errHandler = require('./middleware/error');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

// load env & connect database
dotenv.config({ path: './config/config.env' });
connectDB();

const app = express();
app.use(express.json());

//dev logging middlewar
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1', apiv1);
app.use(errHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

// @desc  Generic unhandled promise rejection handler.
//        Close server and exit if unable to connect to db.
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});
