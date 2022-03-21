const NodeGeocoder = require('node-geocoder');
const dotenv = require('dotenv');

// load env & connect database
dotenv.config({ path: './config/config.env' });

const options = {
  provider: process.env.GEOCODER_PROVIDER,
  httpadapter: 'https',
  apiKey: process.env.GEO_PROVIDER_API_KEY,
  formatter: null,
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;
