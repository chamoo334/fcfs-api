const ErrorResponse = require('../../utils/ErrorResponse');
const geocoder = require('../../utils/geocoder');
const genDs = require('./generalQuery');
const asyncHandler = require('../../middleware/async');
const Campground = require('../../models/Campground');
const Park = require('../../models/Park');
const State = require('../../models/State');
const slugify = require('slugify');
const { query } = require('express');
const path = require('path');

// @desc    Get all campgrounds
// @route   GET /api/v1/campgrounds
// @access  Public
exports.getCampgrounds = asyncHandler(async (req, res, next) => {
  await genDs.advanceCampQuery(req, res);
  res.status(200).json(res.advancedResults);
});

// @desc    Get all campgrounds within a distance from zipcode
// @route   GET /api/v1/campgrounds/:zipcode/:distance
// @access  Public
exports.getCampsRadius = asyncHandler(async (req, res, next) => {
  // TODO: add sort by distance
  await genDs.advanceCampQuery(req, res, null, { fee: 'asc' });
  res.status(200).json(res.advancedResults);
});

//@desc     Get a state's campgrounds
//@route    GET /api/v1/:state
//@access   Public
exports.getState = asyncHandler(async (req, res, next) => {
  await genDs.advanceCampQuery(req, res);

  if (res.resultsError) {
    return next(
      new ErrorResponse(res.resultsError.msg, res.resultsError.status)
    );
  }

  res.status(200).json(res.advancedResults);
});

//@desc     Get all campgrounds from a specific park
//@route    GET /api/v1/:state/:park
//@access   Public
exports.getPark = asyncHandler(async (req, res, next) => {
  await genDs.advanceCampQuery(req, res);

  if (res.resultsError) {
    return next(
      new ErrorResponse(res.resultsError.msg, res.resultsError.status)
    );
  }

  res.status(200).json(res.advancedResults);
});

//@desc     Get a specific campground
//@route    GET /api/v1/:state/:park/:campground
//@access   Public
exports.getCampground = asyncHandler(async (req, res, next) => {
  await genDs.advanceCampQuery(req, res);

  if (res.resultsError) {
    return next(
      new ErrorResponse(res.resultsError.msg, res.resultsError.status)
    );
  }

  res.status(200).json(res.advancedResults);
});

//@desc     Create a new campground and/or park
//@route    POST /api/v1/:state
//@access   Private (logged in or token)
exports.postCampground = asyncHandler(async (req, res, next) => {
  if (!req.body.park) {
    return next(new ErrorResponse(`Please include a park name`, 400));
  }
  let createdPark = false;
  const parkSlug = slugify(req.body.park, { lower: true });

  // obtain state data
  const state = await genDs.findState(req.params.state.toUpperCase(), res);
  if (res.resultsError) {
    return next(
      new ErrorResponse(res.resultsError.msg, res.resultsError.status)
    );
  }

  //find park or create park (requires an address)
  let park = await genDs.findPark(parkSlug, res, state[0].id, true);

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
  // find state and park
  const state = await genDs.findState(req.params.state.toUpperCase(), res);
  if (res.resultsError) {
    return next(
      new ErrorResponse(res.resultsError.msg, res.resultsError.status)
    );
  }

  let park = await genDs.findPark(req.params.park, res, state[0].id, false);
  if (res.resultsError) {
    return next(
      new ErrorResponse(res.resultsError.msg, res.resultsError.status)
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
  // find state and park
  const state = await genDs.findState(req.params.state.toUpperCase(), res);
  if (res.resultsError) {
    return next(
      new ErrorResponse(res.resultsError.msg, res.resultsError.status)
    );
  }

  let park = await genDs.findPark(req.params.park, res, state[0].id, false);
  if (res.resultsError) {
    return next(
      new ErrorResponse(res.resultsError.msg, res.resultsError.status)
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
  // find state and park
  const state = await genDs.findState(req.params.state.toUpperCase(), res);
  if (res.resultsError) {
    return next(
      new ErrorResponse(res.resultsError.msg, res.resultsError.status)
    );
  }

  let park = await genDs.findPark(req.params.park, res, state[0].id, false);
  if (res.resultsError) {
    return next(
      new ErrorResponse(res.resultsError.msg, res.resultsError.status)
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

//@desc     Upload an image for a specific campground
//@route    PUT /api/v1/:state/:park/:campground/photo
//@access   Private (logged in or token)
exports.putPhoto = asyncHandler(async (req, res, next) => {
  if (!req.files || !req.files.file.mimetype.startsWith('image')) {
    return next(new ErrorResponse('Please upload an image file.', 400));
  } else if (req.files.file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Image size cannot be greater than ${process.env.MAX_FILE_UPLOAD}.`,
        400
      )
    );
  }

  // find state and park
  const state = await genDs.findState(req.params.state.toUpperCase(), res);
  if (res.resultsError) {
    return next(
      new ErrorResponse(res.resultsError.msg, res.resultsError.status)
    );
  }

  let park = await genDs.findPark(req.params.park, res, state[0].id, false);
  if (res.resultsError) {
    return next(
      new ErrorResponse(res.resultsError.msg, res.resultsError.status)
    );
  }

  const campground = await Campground.findOne({
    slug: req.params.campground,
    parkID: park[0].id,
    stateID: state[0].id,
  });

  if (!campground) {
    return res
      .status(400)
      .json({ success: false, error: 'Server not able to find campground' });
  }

  const file = req.files.file;
  file.name = `photo_${req.params.state}_${req.params.park}_${
    req.params.campground
  }_${path.parse(file.name).ext}`;

  // TODO: remove old image before adding new

  file.mv(
    `${process.env.FILE_UPLOAD_PATH}/campgrounds/${file.name}`,
    async err => {
      if (err) {
        return next(new ErrorResponse(`Server upload error(${err})`, 500));
      }
    }
  );

  await Campground.findByIdAndUpdate(campground._id, { photo: file.name });

  res.status(200).json({
    sucess: true,
    // TODO: determine if you want to include full campground
    data: file.name,
  });
});

//@desc     Delete a specific park and its campgrounds
//@route    DELETE /api/v1/:state/:park
//@access   Private (moderators only)
exports.delPark = asyncHandler(async (req, res, next) => {
  // find state and park
  const state = await genDs.findState(req.params.state.toUpperCase(), res);
  if (res.resultsError) {
    return next(
      new ErrorResponse(res.resultsError.msg, res.resultsError.status)
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

//@desc     Delete a specific campground
//@route    DELETE /api/v1/:state/:park/:campground
//@access   Private (moderators only)
exports.delCampground = asyncHandler(async (req, res, next) => {
  // find state and park
  const state = await genDs.findState(req.params.state.toUpperCase(), res);
  if (res.resultsError) {
    return next(
      new ErrorResponse(res.resultsError.msg, res.resultsError.status)
    );
  }

  let park = await genDs.findPark(req.params.park, res, state[0].id, false);
  if (res.resultsError) {
    return next(
      new ErrorResponse(res.resultsError.msg, res.resultsError.status)
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
