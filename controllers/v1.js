const ErrorResponse = require('../utils/ErrorResponse');
const asyncHandler = require('../middleware/async');
const Campground = require('../models/Campground');
const Park = require('../models/Park');
const State = require('../models/State');
const unslugify = require('unslugify');

// @desc    Get all campgrounds
// @route   GET /api/v1/campgrounds
// @access  Public
exports.getCampgrounds = asyncHandler(async (req, res, next) => {
  const campgrounds = await Campground.find();
  res.status(200).json({
    sucess: true,
    count: campgrounds.length,
    data: campgrounds,
  });
});

//@desc     Get a state's campgrounds
//@route    GET /api/v1/:state
//@access   Public
exports.getState = (req, res, next) => {
  res.status(200).json({
    sucess: true,
    msg: `Return all campgrounds in ${req.params.state}`,
  });
};

//@desc     Get all campgrounds from a specific park
//@route    GET /api/v1/:state/:park
//@access   Public
exports.getPark = (req, res, next) => {
  res.status(200).json({
    sucess: true,
    msg: `Return all campgrounds in park with the ID ${req.params.park} located in ${req.params.state}`,
  });
};

//@desc     Get a specific campground
//@route    GET /api/v1/:state/:park/:campground
//@access   Public
exports.getCampground = asyncHandler(async (req, res, next) => {
  const campground = await Campground.findById(req.params.campground);

  // formatted campground not found
  if (!campground) {
    return next(
      new ErrorResponse(
        `Campground not found with id of ${req.params.campground}`,
        404
      )
    );
  }

  // TODO: verify state and park match for any found campgrounds
  // if (
  //   req.params.state.toUpperCase() !== campground.state ||
  //   req.params.park !== campground.slug
  // ) {
  //   res.status(400).json({ success: false });
  // } else {
  res.status(200).json({
    sucess: true,
    data: campground,
  });
  // }
});

//@desc     Create a new campground and/or park TODO: add territories
//@route    POST /api/v1/:state
//@access   Private (logged in or token)
exports.postCampground = asyncHandler(async (req, res, next) => {
  req.body.state = req.params.state;

  if (req.body.vote) {
    if (req.body.vote === 1) {
      req.body.goodVotes = 1;
    } else if (req.body.vote === -1) {
      req.body.badVotes = 1;
    }
  }

  const newCampground = await Campground.create(req.body);

  res.status(201).json({
    sucess: true,
    data: newCampground,
  });
});

//@desc     Update data of a spceific campground
//@route    PUT /api/v1/:state/:park/:campground
//@access   Private (logged in or token)
exports.putCampground = asyncHandler(async (req, res, next) => {
  // TODO: find campground by name or slug and get ID
  const campground = await Campground.findByIdAndUpdate(
    req.params.campground,
    req.body,
    { new: true, runValidators: true }
  );

  // formatted campground not found
  if (!campground) {
    return next(
      new ErrorResponse(
        `Campground not found with id of ${req.params.campground}`,
        404
      )
    );
  }

  // TODO: verify state and park match for any found campgrounds
  // if (
  //   req.params.state.toUpperCase() !== campground.state ||
  //   req.params.park !== campground.slug
  // ) {
  //   res.status(400).json({ success: false });
  // } else {
  res.status(200).json({
    sucess: true,
    data: campground,
  });
  // }
});

//@desc     Increase positive rating by 1 of specific campground
//@route    PUT /api/v1/:state/:park/:campground/good
//@access   PUBLIC
exports.putGood = (req, res, next) => {
  res.status(200).json({
    sucess: true,
    msg: `Update positive vote for campground with ID ${req.params.campground} in the park with the ID ${req.params.park} located in ${req.params.state}`,
  });
};

//@desc     Increase negative rating by 1 of specific campground
//@route    PUT /api/v1/:state/:park/:campground/bad
//@access   PUBLIC
exports.putBad = (req, res, next) => {
  res.status(200).json({
    sucess: true,
    msg: `Update negative votes for campground with ID ${req.params.campground} in the park with the ID ${req.params.park} located in ${req.params.state}`,
  });
};

//@desc     Delete a specific park and its campgrounds
//@route    DELETE /api/v1/:state/:park
//@access   Private (moderators only)
exports.delPark = (req, res, next) => {
  res.status(204).json({
    sucess: true,
    msg: `Delete park with the ID ${req.params.park} located in ${req.params.state} along with its campgrounds`,
  });
};

// 620daa0da2bc450df5f89de4

//@desc     Delete a specific campground
//@route    DELETE /api/v1/:state/:park/:campground
//@access   Private (moderators only)
exports.delCampground = asyncHandler(async (req, res, next) => {
  const campground = await Campground.findByIdAndDelete(req.params.campground);

  if (!campground) {
    return res.status(400).json({ success: false });
  }

  // TODO: verify state and park match for any found campgrounds
  // if (
  //   req.params.state.toUpperCase() !== campground.state ||
  //   req.params.park !== campground.slug
  // ) {
  //   res.status(400).json({ success: false });
  // } else {
  res.status(200).json({
    sucess: true,
    data: {},
  });
  // }
});
