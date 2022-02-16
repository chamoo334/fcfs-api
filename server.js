const apiv1 = require('./routes/apiv1');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

// load
dotenv.config({ path: './config/config.env' });
const app = express();

// app.use(loggingMiddleware);
// app.use(logger);

app.use('/api/v1', apiv1);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
