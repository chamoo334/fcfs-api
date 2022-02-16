// @desc    Get all campgrounds
// @route   GET /api/v1/campgrounds
// @access  Public
exports.getCampgrounds = (req, res, next) => {
  res.status(200).json({
    sucess: true,
    msg: 'Return all campgrounds',
  });
};

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
//@route    GET /api/v1/:state/:parkID
//@access   Public
exports.getPark = (req, res, next) => {
  res.status(200).json({
    sucess: true,
    msg: `Return all campgrounds in park with the ID ${req.params.parkID} located in ${req.params.state}`,
  });
};

//@desc     Get a specific campground
//@route    GET /api/v1/:state/:parkID/:campgroundID
//@access   Public
exports.getCampground = (req, res, next) => {
  res.status(200).json({
    sucess: true,
    msg: `Return campground with ID ${req.params.campgroundID} in the park with the ID ${req.params.parkID} located in ${req.params.state}`,
  });
};

//@desc     Create new campground with known parkID
//@route    POST /api/v1/:state/:parkID
//@access   Private (logged in or token)
exports.postPark = (req, res, next) => {
  res.status(201).json({
    sucess: true,
    msg: `Create new campground in the park with the ID ${req.params.parkID} located in ${req.params.state}`,
  });
};

//@desc     Create a new park and campground
//@route    POST /api/v1/:state
//@access   Private (logged in or token)
exports.postState = (req, res, next) => {
  res.status(200).json({
    sucess: true,
    msg: `Create new park and a campground located in ${req.params.state}`,
  });
};

//@desc     Update data of a spceific campground
//@route    PUT /api/v1/:state/:parkID/:campgroundID
//@access   Private (logged in or token)
exports.putCampground = (req, res, next) => {
  res.status(200).json({
    sucess: true,
    msg: `Update data for campground with ID ${req.params.campgroundID} in the park with the ID ${req.params.parkID} located in ${req.params.state}`,
  });
};

//@desc     Increase positive rating by 1 of specific campground
//@route    PUT /api/v1/:state/:parkID/:campgroundID/good
//@access   PUBLIC
exports.putGood = (req, res, next) => {
  res.status(200).json({
    sucess: true,
    msg: `Update positive vote for campground with ID ${req.params.campgroundID} in the park with the ID ${req.params.parkID} located in ${req.params.state}`,
  });
};

//@desc     Increase negative rating by 1 of specific campground
//@route    PUT /api/v1/:state/:parkID/:campgroundID/bad
//@access   PUBLIC
exports.putBad = (req, res, next) => {
  res.status(200).json({
    sucess: true,
    msg: `Update negative votes for campground with ID ${req.params.campgroundID} in the park with the ID ${req.params.parkID} located in ${req.params.state}`,
  });
};

//@desc     Delete a specific park and its campgrounds
//@route    DELETE /api/v1/:state/:parkID
//@access   Private (moderators only)
exports.delPark = (req, res, next) => {
  res.status(204).json({
    sucess: true,
    msg: `Delete park with the ID ${req.params.parkID} located in ${req.params.state} along with its campgrounds`,
  });
};

//@desc     Delete a specific campground
//@route    DELETE /api/v1/:state/:parkID/:campgroundID
//@access   Private (moderators only)
exports.delCampground = (req, res, next) => {
  res.status(204).json({
    sucess: true,
    msg: `Delete campground with ID ${req.params.campgroundID} in the park with the ID ${req.params.parkID} located in ${req.params.state}`,
  });
};
