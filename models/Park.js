const mongoose = require('mongoose');
const ParkSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    unique: true, //TODO: use middleware to ensure name is unique to state
    trim: true,
    maxlength: [50, "Campground's name cannot be longer than 50 characters"],
  },
  state: {
    type: String,
    required: [true, "Please add the state's 2 letter identifier."],
    uppercase: true,
    minlength: [2, "Please use the state's 2 letter identifier"],
    maxlength: [2, "Please use the state's 2 letter identifier"],
  },
  stateID: {
    type: String,
    required: [true, 'Server unable to locate state id. Try again later.'],
  },
});

module.exports = mongoose.model('Park', ParkSchema);
