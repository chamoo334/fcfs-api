const createApp = require('./app.js');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;
let server;

async function getApp() {
  return await createApp(connectDB);
}

getApp().then(app => {
  server = app.listen(
    PORT,
    console.log(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
  );
});

// Generic unhandled promise rejection handler.
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});
