const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/async');
const User = require('../../models/User');
const path = require('path');
const jwt = require('jsonwebtoken');
// @desc
// @route
// @access  Public

// @desc    Register a user
// @route   POST api/v1/auth/register
// @access  Public
exports.authRegister = asyncHandler(async (req, res, next) => {
  console.log('here1');
  const { name, email, password, role } = req.body;

  // create user
  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  sendTokenCookieResponse(user, 200, res);
});

// @desc    Login a user
// @route   POST api/v1/auth/login
// @access  Public
exports.authLogin = asyncHandler(async (req, res, next) => {
  console.log('here2');

  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse('User email and password required', 400));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  const validPassword = await user.matchPassword(password);

  if (!validPassword) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  sendTokenCookieResponse(user, 200, res);
});

//get token, create cookie and send both in response
const sendTokenCookieResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENVIRONMENT === 'production') {
    options.secure = true;
  }

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
  });
};

// @desc    Get current logged in user
// @route   POST api/v1/auth/me
// @access  Private user
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = req.user;

  res.status(200).json({
    success: true,
    data: user,
  });
});
