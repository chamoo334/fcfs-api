const ErrorResponse = require('../utils/ErrorResponse');
const asyncHandler = require('../middleware/async');
const geocder = require('../utils/geocoder');
const Campground = require('../models/Campground');
const Park = require('../models/Park');
const State = require('../models/State');
const slugify = require('slugify');
const geocoder = require('../utils/geocoder');
// import { unslugify } from 'unslugify';

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

// @desc    Get all campgrounds within a distance from zipcode
// @route   GET /api/v1/campgrounds/:zipcode/:distance
// @access  Public
exports.getCampsRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  //obtain geocoder data
  const loc = await geocoder.geocode(zipcode);
  const usrLat = loc[0].latitude;
  const usrLong = loc[0].longitude;

  // determine radius (distance/earth radius)
  const radius = distance / 3963;

  const campgrounds = await Campground.find({
    location: { $geoWithin: { $centerSphere: [[usrLong, usrLat], radius] } },
  });

  res.status(200).json({
    sucess: true,
    count: campgrounds.length,
    data: campgrounds,
  });
});

//@desc     Get a state's campgrounds
//@route    GET /api/v1/:state
//@access   Public
exports.getState = asyncHandler(async (req, res, next) => {
  const state = await State.find({
    identifier: req.params.state.toUpperCase(),
  });

  if (state.length < 1) {
    return next(
      new ErrorResponse(
        `State with identifier of ${req.params.state} not found`,
        404
      )
    );
  }

  const campgrounds = await Campground.find({ stateID: state[0].id });

  res.status(200).json({
    sucess: true,
    state: req.params.state,
    count: campgrounds.length,
    data: campgrounds,
  });
});

//@desc     Get all campgrounds from a specific park
//@route    GET /api/v1/:state/:park
//@access   Public
exports.getPark = asyncHandler(async (req, res, next) => {
  const state = await State.find({
    identifier: req.params.state.toUpperCase(),
  });

  if (state.length < 1) {
    return next(
      new ErrorResponse(
        `State with identifier of ${req.params.state} not found`,
        404
      )
    );
  }

  const park = await Park.find({ slug: req.params.park });
  if (park.length < 1) {
    // TODO: unslugify park param
    return next(
      new ErrorResponse(`Park with name of ${req.params.park} not found`, 404)
    );
  }

  const campgrounds = await Campground.find({
    stateID: state[0].id,
    parkID: park[0].id,
  });

  res.status(200).json({
    sucess: true,
    state: req.params.state,
    park: req.params.park, //TODO: unslugify
    count: campgrounds.length,
    data: campgrounds,
  });
});

//@desc     Get a specific campground
//@route    GET /api/v1/:state/:park/:campground
//@access   Public
exports.getCampground = asyncHandler(async (req, res, next) => {
  const state = await State.find({
    identifier: req.params.state.toUpperCase(),
  });

  if (state.length < 1) {
    return next(
      new ErrorResponse(
        `State with identifier of ${req.params.state} not found`,
        404
      )
    );
  }

  const park = await Park.find({ slug: req.params.park });
  if (park.length < 1) {
    // TODO: unslugify park param
    return next(
      new ErrorResponse(`Park with name of ${req.params.park} not found`, 404)
    );
  }

  const campgrounds = await Campground.find({
    slug: req.params.campground,
    stateID: state[0].id,
    parkID: park[0].id,
  });

  res.status(200).json({
    sucess: true,
    state: req.params.state,
    park: req.params.park, //TODO: unslugify
    count: campgrounds.length,
    data: campgrounds,
  });
});

//@desc     Create a new campground and/or park
//@route    POST /api/v1/:state
//@access   Private (logged in or token)
exports.postCampground = asyncHandler(async (req, res, next) => {
  if (!req.body.park) {
    return next(new ErrorResponse(`Please include a park name`, 400));
  }
  let createdPark = false;

  // obtain stateID, parkID & update body
  const state = await State.find({
    identifier: req.params.state.toUpperCase(),
  });

  //TEST: make sure this right
  if (!state.length === 0) {
    return next(
      new ErrorResponse(
        `Unable to find a state with the 2 letter identifier of ${req.params.state}`,
        404
      )
    );
  }

  const parkSlug = slugify(req.body.park, { lower: true });
  let park = await Park.find({
    slug: parkSlug,
    stateID: state[0].id,
  });

  if (park.length === 0) {
    if (!req.body.address) {
      return next(
        new ErrorResponse(
          `Please include an address of either the campground or the park`,
          404
        )
      );
    }

    const parkData = {
      name: req.body.park,
      slug: parkSlug,
      state: undefined,
      stateID: state[0].id,
      address: req.body.address,
    };
    park = await Park.create(parkData);
    createdPark = true;
  }

  req.body.stateID = state[0].id;

  if (createdPark) {
    req.body.parkID = park.id;
  } else {
    req.body.parkID = park[0].id;
    if (!req.body.address) {
      req.body.address = park[0].location.formattedAddress;
    }
  }

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
  const state = await State.find({
    identifier: req.params.state.toUpperCase(),
  });

  if (state.length < 1) {
    return next(
      new ErrorResponse(
        `State with identifier of ${req.params.state} not found`,
        404
      )
    );
  }

  const park = await Park.find({ slug: req.params.park });
  if (park.length < 1) {
    // TODO: unslugify park param
    return next(
      new ErrorResponse(`Park with name of ${req.params.park} not found`, 404)
    );
  }

  const campground = await Campground.findOneAndUpdate(
    { slug: req.params.campground, parkID: park[0].id, stateID: state[0].id },
    req.body,
    { new: true, runValidators: true }
  );

  res.status(200).json({
    sucess: true,
    data: campground,
  });
});

//@desc     Increase positive rating by 1 of specific campground
//@route    PUT /api/v1/:state/:park/:campground/good
//@access   PUBLIC
exports.putGood = asyncHandler(async (req, res, next) => {
  const state = await State.find({
    identifier: req.params.state.toUpperCase(),
  });

  if (state.length < 1) {
    return next(
      new ErrorResponse(
        `State with identifier of ${req.params.state} not found`,
        404
      )
    );
  }

  const park = await Park.find({ slug: req.params.park });
  if (park.length < 1) {
    // TODO: unslugify park param
    return next(
      new ErrorResponse(`Park with name of ${req.params.park} not found`, 404)
    );
  }

  const campground = await Campground.findOneAndUpdate(
    { slug: req.params.campground, parkID: park[0].id, stateID: state[0].id },
    { $inc: { goodVotes: 1 } },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    sucess: true,
    data: campground,
  });
});

//@desc     Increase negative rating by 1 of specific campground
//@route    PUT /api/v1/:state/:park/:campground/bad
//@access   PUBLIC
exports.putBad = asyncHandler(async (req, res, next) => {
  const state = await State.find({
    identifier: req.params.state.toUpperCase(),
  });

  if (state.length < 1) {
    return next(
      new ErrorResponse(
        `State with identifier of ${req.params.state} not found`,
        404
      )
    );
  }

  const park = await Park.find({ slug: req.params.park });
  if (park.length < 1) {
    // TODO: unslugify park param
    return next(
      new ErrorResponse(`Park with name of ${req.params.park} not found`, 404)
    );
  }

  const campground = await Campground.findOneAndUpdate(
    { slug: req.params.campground, parkID: park[0].id, stateID: state[0].id },
    { $inc: { badVotes: 1 } },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    sucess: true,
    data: campground,
  });
});

//@desc     Delete a specific park and its campgrounds
//@route    DELETE /api/v1/:state/:park
//@access   Private (moderators only)
exports.delPark = asyncHandler(async (req, res, next) => {
  const state = await State.find({
    identifier: req.params.state.toUpperCase(),
  });

  if (state.length < 1) {
    return next(
      new ErrorResponse(
        `State with identifier of ${req.params.state} not found`,
        404
      )
    );
  }

  const park = await Park.findOne({
    slug: req.params.park,
    stateID: state[0].id,
  });

  if (!park) {
    return res
      .status(400)
      .json({ success: false, error: 'Server not able to find park' });
  }

  park.remove();

  res.sendStatus(204);
});

// 620daa0da2bc450df5f89de4

//@desc     Delete a specific campground
//@route    DELETE /api/v1/:state/:park/:campground
//@access   Private (moderators only)
exports.delCampground = asyncHandler(async (req, res, next) => {
  const state = await State.find({
    identifier: req.params.state.toUpperCase(),
  });

  if (state.length < 1) {
    return next(
      new ErrorResponse(
        `State with identifier of ${req.params.state} not found`,
        404
      )
    );
  }

  const park = await Park.find({ slug: req.params.park });
  if (park.length < 1) {
    // TODO: unslugify park param
    return next(
      new ErrorResponse(`Park with name of ${req.params.park} not found`, 404)
    );
  }

  const campground = await Campground.findOneAndDelete({
    slug: req.params.campground,
    parkID: park[0].id,
    stateID: state[0].id,
  });

  if (!campground) {
    return res
      .status(400)
      .json({ success: false, error: 'Server not able to find campground' });
  }

  res.sendStatus(204);
});
