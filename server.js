const v1Campgrounds = require('./routes/v1/campgrounds');
const v1Auth = require('./routes/v1/auth');
const v1Users = require('./routes/v1/users');
const connectDB = require('./config/db');
const errHandler = require('./middleware/error');
const { cleanInput } = require('./middleware/xssCleanIn');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');
const cors = require('cors'); //TODO: consider options for users and auth
const path = require('path');

// load env & connect database
dotenv.config({ path: './config/config.env' });
connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());

//dev logging middlewar
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(fileupload());
app.use(mongoSanitize());
app.use(helmet());
app.use(cleanInput());

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use(limiter);

app.use(hpp());
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/v1/auth', v1Auth);
app.use('/api/v1/users', v1Users);
app.use('/api/v1', v1Campgrounds);
// app.use('/api/v1', v1Campgrounds);

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
