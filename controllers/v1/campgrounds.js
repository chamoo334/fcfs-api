const ErrorResponse = require('../../utils/ErrorResponse');
const { findState, findPark } = require('../../middleware/generalQuery');
const asyncHandler = require('../../middleware/async');
const Campground = require('../../models/Campground');
const Park = require('../../models/Park');
const Photo = require('../../models/Photo');
const State = require('../../models/State');
const slugify = require('slugify');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

// @desc    Get all campgrounds
// @route   GET /api/v1/campgrounds
// @access  Public
exports.getCampgrounds = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get all campgrounds within a distance from zipcode
// @route   GET /api/v1/campgrounds/:zipcode/:distance
// @access  Public
exports.getCampsRadius = asyncHandler(async (req, res, next) => {
  // TODO: add sort by distance
  res.status(200).json(res.advancedResults);
});

//@desc     Get a state's campgrounds
//@route    GET /api/v1/:state
//@access   Public
exports.getState = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

//@desc     Get all campgrounds from a specific park
//@route    GET /api/v1/:state/:park
//@access   Public
exports.getPark = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

//@desc     Get a specific campground
//@route    GET /api/v1/:state/:park/:campground
//@access   Public
exports.getCampground = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

//@desc     Create a new campground and/or park
//@route    POST /api/v1/:state
//@access   Private/User/Contributor/Admin
exports.postCampground = asyncHandler(async (req, res, next) => {
  if (!req.body.park) {
    return next(new ErrorResponse(`Please include a park name`, 400));
  }

  req.body.lastModifiedBy = req.user.name;

  let createdPark = false;
  const parkSlug = slugify(req.body.park, { lower: true });

  //find park or create park (requires an address)
  let park = await findPark(
    parkSlug,
    res,
    req.params.state.toUpperCase(),
    true
  );

  if (park.length === 0) {
    if (!req.body.address) {
      return next(
        new ErrorResponse(
          `Please include an address of either the campground or the park`,
          404
        )
      );
    }

    // obtain state data
    const state = await findState(req.params.state.toUpperCase(), res);
    if (res.resultsError) {
      return next(
        new ErrorResponse(res.resultsError.msg, res.resultsError.status)
      );
    }
    let parkData = {
      name: req.body.park,
      slug: parkSlug,
      state: undefined,
      stateID: state[0].id,
      address: req.body.address,
    };
    park = await Park.create(parkData);
    createdPark = true;
  }

  if (createdPark) {
    req.body.parkID = park.id;
    req.body.stateID = park.stateID;
  } else {
    req.body.parkID = park[0].id;
    req.body.stateID = park[0].stateID;
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
//@access   Private/Contributor/Admin
exports.putCampground = asyncHandler(async (req, res, next) => {
  req.body.lastModifiedBy = req.user.name;

  const park = await findPark(
    req.params.park,
    res,
    req.params.state.toUpperCase(),
    false
  );
  if (res.resultsError) {
    return next(
      new ErrorResponse(res.resultsError.msg, res.resultsError.status)
    );
  }

  const campground = await Campground.findOneAndUpdate(
    {
      slug: req.params.campground,
      parkID: park[0].id,
      stateID: park[0].stateID,
    },
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
//@access   Private/User/Contributor/Admin
exports.putGood = asyncHandler(async (req, res, next) => {
  const park = await findPark(
    req.params.park,
    res,
    req.params.state.toUpperCase(),
    false
  );
  if (res.resultsError) {
    return next(
      new ErrorResponse(res.resultsError.msg, res.resultsError.status)
    );
  }

  const campground = await Campground.findOneAndUpdate(
    {
      slug: req.params.campground,
      parkID: park[0].id,
      stateID: park[0].stateID,
    },
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
//@access   Private/User/Contributor/Admin
exports.putBad = asyncHandler(async (req, res, next) => {
  const park = await findPark(
    req.params.park,
    res,
    req.params.state.toUpperCase(),
    false
  );
  if (res.resultsError) {
    return next(
      new ErrorResponse(res.resultsError.msg, res.resultsError.status)
    );
  }

  const campground = await Campground.findOneAndUpdate(
    {
      slug: req.params.campground,
      parkID: park[0].id,
      stateID: park[0].stateID,
    },
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
//@access   Private/User/Contributor/Admin
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

  const park = await findPark(
    req.params.park,
    res,
    req.params.state.toUpperCase(),
    false
  );
  if (res.resultsError) {
    return next(
      new ErrorResponse(res.resultsError.msg, res.resultsError.status)
    );
  }

  const campground = await Campground.findOne({
    slug: req.params.campground,
    parkID: park[0].id,
    stateID: park[0].stateID,
  });

  if (!campground) {
    return next(new ErrorResponse('Server not able to find campground', 400));
  }

  const oldPhotoID = campground.photoID || null;

  const file = req.files.file;
  file.name = `photo-camp-${campground.slug}${path.parse(file.name).ext}`;

  await file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`);

  const photoData = {
    name: file.name,
    img: {
      data: fs.readFileSync(
        path.join(
          __dirname,
          `../../${process.env.FILE_UPLOAD_PATH}/${file.name}`
        )
      ),
      contentType: file.mimetype,
    },
  };

  const photo = await Photo.create(photoData);

  if (!photo) {
    return next(new ErrorResponse('Server error', 500));
  }

  // update campground
  //FIXME: campground.save w/ validation Error: Cannot read properties of undefined (reading 'minConfidence')
  // campground.photo = photo.slug;
  // campground.photoID = photo.id;
  // console.log(campground.photo, campground.photoID);
  // campground.markModified('photo');
  // campground.save({ validateBeforeSave: false });
  const campgroundUpdate = await Campground.findByIdAndUpdate(campground.id, {
    photo: photo.slug,
    photoID: photo.id,
  });

  // cleanup uploads folder
  const delFiles = fs
    .readdirSync(`${process.env.FILE_UPLOAD_PATH}`)
    .filter(fn => fn.startsWith(file.name.substring(0, file.name.length - 4)));

  for (const fName of delFiles) {
    const fullDelPath = `${process.env.FILE_UPLOAD_PATH}/${fName}`;
    fs.unlinkSync(fullDelPath);
  }

  // delete old photo from db
  if (oldPhotoID) {
    await Photo.findByIdAndDelete(oldPhotoID);
  }

  res.status(200).json({
    sucess: true,
    data: campgroundUpdate,
  });
});

//@desc     Delete a specific park and its campgrounds
//@route    DELETE /api/v1/:state/:park
//@access   Private/Admin
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

//@desc     Delete a specific campground
//@route    DELETE /api/v1/:state/:park/:campground
//@access   Private/Admin
exports.delCampground = asyncHandler(async (req, res, next) => {
  const park = await findPark(
    req.params.park,
    res,
    req.params.state.toUpperCase(),
    false
  );
  if (res.resultsError) {
    return next(
      new ErrorResponse(res.resultsError.msg, res.resultsError.status)
    );
  }

  const campground = await Campground.findOneAndDelete({
    slug: req.params.campground,
    parkID: park[0].id,
    stateID: park[0].stateID,
  });

  if (!campground) {
    return res
      .status(400)
      .json({ success: false, error: 'Server not able to find campground' });
  }

  res.sendStatus(204);
});
