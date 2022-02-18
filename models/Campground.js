const geocoder = require('../utils/geocoder');
const Park = require('./Park');
const mongoose = require('mongoose');
const slugify = require('slugify');

// {
//   toJSON: {
//      transform: function(doc, ret) {
//        ret.id = ret._id;
//        delete ret._id;
//      }
//    }
// }

const CampgroundSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
      trim: true,
      maxlength: [50, "Campground's name cannot be longer than 50 characters"],
      validate: [
        campParkValidator,
        'Campground already exists in provided park.',
      ],
    },
    slug: String,
    park: {
      type: String,
      required: [true, 'Please include a park name.'],
    },
    parkID: {
      type: String,
    },
    state: {
      type: String,
      required: [true, 'Server unable to locate state id. Try again later.'],
      uppercase: true,
      minlength: [2, "Please use the state's 2 letter identifier"],
      maxlength: [2, "Please use the state's 2 letter identifier"],
    },
    stateID: {
      type: String,
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
    slug: String,
    fee: {
      type: Number,
      required: [true, 'Please provide the fee per night'],
      validate: {
        validator: Number.isInteger,
        message: 'Fee must be an integer. Please round up.',
      },
    },
    toilet: {
      type: Boolean,
      required: [true, 'Please state if a toilet is available'],
    },
    water: {
      type: Boolean,
      required: [true, 'Please state if a water source is available'],
    },
    yearRound: {
      type: Boolean,
      default: false,
    },
    goodVotes: {
      type: Number,
      default: 0,
    },
    badVotes: {
      type: Number,
      default: 0,
    },
    lastUpdate: {
      type: Date,
      default: Date.now,
    },
    photo: {
      type: String,
      default: 'no-photo.jpg',
    },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
        delete ret.parkID;
        delete ret.stateID;
        delete ret.photo;
      },
    },
  }
);

//TEST: verify asyncHandler is not needed or use try and catch
// Validate campground name is unique to park
async function campParkValidator(value) {
  const campgrounds = await mongoose.models.Campground.find({
    stateID: this.stateID,
    park: this.park,
    name: value,
  });

  if (campgrounds.length > 0) {
    return false;
  }

  return true;
}

//create campground slug from name
CampgroundSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// Geocode & create location field
CampgroundSchema.pre('save', async function (next) {
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

module.exports = mongoose.model('Campground', CampgroundSchema);
