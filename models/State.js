const mongoose = require('mongoose');
const StateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    unique: true,
    trim: true,
    maxlength: [50, "State's name cannot be longer than 50 characters"],
  },
  identifier: {
    type: String,
    required: [true, '2 letter identifer is required.'],
    uppercase: true,
    minlength: [2, "Please use the state's 2 letter identifier"],
    maxlength: [2, "Please use the state's 2 letter identifier"],
  },
});

module.exports = mongoose.model('State', StateSchema);
