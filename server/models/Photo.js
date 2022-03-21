const ErrorResponse = require('../utils/ErrorResponse');
const mongoose = require('mongoose');
const slugify = require('slugify');

const PhotoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
  },
  slug: String,
  img: {
    // data: { type: [Buffer] },
    data: Buffer,
    contentType: String,
  },
});

//create photo slug from name
PhotoSchema.pre('save', function (next) {
  const str = this.name;
  const strSub = str.substring(0, str.length - 4);
  this.slug = slugify(strSub, { lower: true });
  next();
});

module.exports = mongoose.model('Photo', PhotoSchema);
