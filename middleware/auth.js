const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/ErrorResponse');
const User = require('../models/User');

//
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.token = token;
  req.user = await User.findById(decoded.id);

  if (!req.user.isEmailConfirmed) {
    return next(
      new ErrorResponse(
        `Please check your email and confirm via the link sent.`,
        403
      )
    );
  }
  next();
});

//grant access based on role
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User role ${req.user.role} not authorized for this route`,
          403
        )
      );
    }
    next();
  };
};
