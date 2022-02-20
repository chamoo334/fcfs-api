const Campground = require('../models/Campground');
const Park = require('../models/Park');
const State = require('../models/State');

exports.advanceStateQ = (populate, mainReqBool) => async (req, res, next) => {
  // if (mainReqBool) {
  //   // Pagination
  //   const page = parseInt(req.query.page, 10) || 1;
  //   const limit = parseInt(req.query.limit, 10) || 0;
  //   const startIndex = (page - 1) * limit;
  //   const endIndex = page * limit;
  //   const total = (await Campground.find()).length;
  //   const find = {};
  // }

  console.log('here');
  next();
};

exports.advanceParkQ = (populate, mainReqBool) => async (req, res, next) => {};

exports.advanceCampQ = populate => async (req, res, next) => {
  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 0;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = (await Campground.find()).length;
  const find = {};

  if (req.params.state) {
    await next(this.advanceStateQ());
    // const state = await State.find({
    //   identifier: req.params.state.toUpperCase(),
    // });
    // if (state.length < 1) {
    //   return next(
    //     new ErrorResponse(
    //       `State with identifier of ${req.params.state} not found`,
    //       404
    //     )
    //   );
    // }
    // find.stateID = state[0].id;
  }

  // if (req.params.park) {
  //   const park = await Park.find({ slug: req.params.park });

  //   if (park.length < 1) {
  //     // TODO: unslugify park param
  //     return next(
  //       new ErrorResponse(`Park with name of ${req.params.park} not found`, 404)
  //     );
  //   }

  //   find.parkID = park[0].id;
  // }

  // if (req.params.campground) {
  //   find.slug = req.params.campground;
  // }

  let query = Campground.find(find);
  query.skip(startIndex).limit(limit);

  if (populate) {
    query.populate(populate);
  }

  const results = await query;

  let response = {
    sucess: true,
    count: results.length,
    data: results,
  };

  if (limit > 0) {
    const pagination = {};
    const url =
      req.protocol +
      '://' +
      req.get('host') +
      req.baseUrl +
      req._parsedUrl.pathname +
      '?page=';
    if (endIndex < total) {
      pagination.next = url + (page + 1) + '&' + 'limit=' + limit;
    }

    if (startIndex > 0) {
      pagination.prev = url + (page - 1) + '&' + 'limit=' + limit;
    }

    response.pagination = pagination;
  }

  res.advancedResults = response;
  next();
};
