const ErrorResponse = require('../../utils/ErrorResponse');
const sendEmail = require('../../utils/sendEmail');
const asyncHandler = require('../../middleware/async');
const User = require('../../models/User');
const crypto = require('crypto');

// @desc    Register a user
// @route   POST api/v1/auth/register
// @access  Public
exports.authRegister = asyncHandler(async (req, res, next) => {
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

// @desc    Logout a user & clear cookie
// @route   GET api/v1/auth/login
// @access  Private/User/Contributor/Admin
exports.authLogout = asyncHandler(async (req, res, next) => {
  //TODO: consider black list for old tokens

  res.clearCookie('token');

  res.status(200).json({
    success: true,
  });
});

// @desc    Get current logged in user
// @route   POST api/v1/auth/me
// @access  Private/User/Contributor/Admin
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = req.user;

  res.status(200).json({
    success: true,
    data: user,
  });
});

//TEST: try and catch
// @desc    Generate and email reset password token
// @route   POST api/v1/auth/forgotPassword
// @access  Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  // find user and set reset token and expiration
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorResponse('User with provided email not found', 404));
  }

  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  // email user resetURL
  const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/auth/resetpassword/${resetToken}`;

  const message = `You are receiving this email because you (or someone else) has 
    requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

  try {
    await sendEmail({
      email: req.body.email,
      subject: 'Password Reset Token',
      message: message,
    });

    res.status(200).json({
      success: true,
      data: 'email sent',
    });
  } catch (err) {
    // console.log(err);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });
    return next(new ErrorResponse('Email could not be sent', 500));
  }
});

// @desc    Reset password and provide new token and cookie
// @route   PUT api/v1/auth/resetpassword/:resetToken
// @access  Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
  // get token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resettoken)
    .digest('hex');

  // find user and set reset token and expiration
  const user = await User.findOne({
    resetPasswordToken: resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorResponse('Invalid token', 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  sendTokenCookieResponse(user, 200, res);
});

// @desc    Update user details
// @route   PUT api/v1/auth/updateDetails
// @access  Private/User/Contributor/Admin
exports.updateDetails = asyncHandler(async (req, res, next) => {
  //TODO: reduce so that it is either or, but both aren't required
  const fieldsTOUpdate = {
    name: req.body.name,
    email: req.body.email,
  };

  const user = await User.findByIdAndUpdate(req.user.id, fieldsTOUpdate, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc    Update password
// @route   PUT api/v1/auth/updatePassword
// @access  Private/User/Contributor/Admin
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  // check current:
  if (!(await user.matchPassword(req.body.currentPassword))) {
    return next(new ErrorResponse('Password is incorrect', 401));
  }

  user.password = req.body.newPassword;
  await user.save();

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

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
  });
};
