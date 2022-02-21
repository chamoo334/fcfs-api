const Campground = require('../../models/Campground');
const Park = require('../../models/Park');
const State = require('../../models/State');
const geocoder = require('../../utils/geocoder');

exports.findState = async (state, res) => {
  const found = await State.find({
    identifier: state,
  });

  if (found.length < 1) {
    res.resultsError = {
      msg: `State with identifier of ${state} not found.`,
      status: 404,
    };
    return;
  }

  return found;
};

exports.findPark = async (park, res, reqState = null, emptyPerm = false) => {
  const find = { slug: park };

  if (reqState) {
    const state = await this.findState(reqState, res);

    if (res.resultsError) {
      return;
    }
    find.stateID = state[0].id;
  }

  const found = await Park.find(find);

  if (found.length < 1 && !emptyPerm) {
    res.resultsError = {
      msg: `Requested park not found.`,
      status: 404,
    };
    return;
  }

  return found;
};

exports.advanceCampQuery = async (
  method,
  req,
  res,
  need = null,
  order = null,
  populate = null
) => {
  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 0;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = (await Campground.find()).length;
  const find = need || {};
  const sort = order || {};

  if (req.params.park) {
    const park = await this.findPark(
      req.params.park,
      res,
      req.params.state.toUpperCase()
    );

    if (res.resultsError) {
      return;
    }

    find.parkID = park[0].id;
    find.stateID = park[0].stateID;
  } else if (req.params.state) {
    const state = await this.findState(req.params.state.toUpperCase(), res);

    if (res.resultsError) {
      return;
    }

    find.stateID = state[0].id;
  }

  if (req.params.campground) {
    find.slug = req.params.campground;
  }

  if (req.params.zipcode && req.params.distance) {
    const { zipcode, distance } = req.params;

    //obtain geocoder data
    const loc = await geocoder.geocode(zipcode);
    const usrLat = loc[0].latitude;
    const usrLong = loc[0].longitude;

    // determine radius (distance/earth radius)
    const radius = distance / 3963;

    find.location = {
      $geoWithin: { $centerSphere: [[usrLong, usrLat], radius] },
    };
  }

  let query = Campground.find(find);
  query.skip(startIndex).limit(limit).sort(sort);

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
};
