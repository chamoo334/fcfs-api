const geocoder = require('../utils/geocoder');
const State = require('./State');
const mongoose = require('mongoose');

const ParkSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
      unique: true, //TODO: use middleware to ensure name is unique to state
      trim: true,
      maxlength: [50, "Campground's name cannot be longer than 50 characters"],
    },
    slug: String,
    stateID: {
      type: String,
      required: [true, 'Server unable to locate state id. Try again later.'],
    },
    address: {
      type: String,
      required: [
        true,
        'An address is required if new campground is associated with a new park',
      ],
    },
    location: {
      // GeoJSON Point
      type: {
        type: String,
        enum: ['Point'],
      },
      coordinates: {
        type: [Number],
        index: '2dsphere',
      },
      formattedAddress: {
        type: String,
      },
    },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

// Geocode & create location field
ParkSchema.pre('save', async function (next) {
  const loc = await geocoder.geocode(this.address);

  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
  };

  // Prevent address from saving twice
  this.address = undefined;

  next();
});

// Cascade delete campgrounds when a park is deleted
ParkSchema.pre('remove', async function (next) {
  console.log(`Campgrounds being removed from ${this.id}`);
  await this.model('Campground').deleteMany({ parkID: this.id });
  next();
});

module.exports = mongoose.model('Park', ParkSchema);
