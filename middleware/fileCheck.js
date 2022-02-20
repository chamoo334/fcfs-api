const ErrorResponse = require('../utils/ErrorResponse');
// const fileupload = require('express-fileupload');

const fileCheck = (req, res, next) => {
  if (!req.files) {
    next();
  }

  //ensure its an image file
  if (!req.files.file.mimetype.startsWith('image/')) {
    return next(new ErrorResponse('Please upload an image file.', 400));
  }

  // verify size
  if (req.files.file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Image size cannot be greater than ${process.env.MAX_FILE_UPLOAD}.`,
        400
      )
    );
  }

  next();
};

module.exports = fileCheck;
