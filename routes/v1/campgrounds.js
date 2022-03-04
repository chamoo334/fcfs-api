const express = require('express');
const router = express.Router();
const {
  getPhoto,
  getCampgrounds,
  getCampsRadius,
  getState,
  getPark,
  getParksState,
  getCampground,
  postCampground,
  putCampground,
  putGood,
  putBad,
  putPhoto,
  delPark,
  delCampground,
} = require('../../controllers/v1/campgrounds');
const { protect, authorize } = require('../../middleware/auth');
const { advanceQuery } = require('../../middleware/generalQuery');
const Campground = require('../../models/Campground');
const Park = require('../../models/Park');

router.route('/photo/:photoslug').get(getPhoto);

router.route('/campgrounds').get(advanceQuery(Campground), getCampgrounds);
router
  .route('/campgrounds/:zipcode/:distance')
  .get(advanceQuery(Campground, null, { fee: 'asc' }), getCampsRadius);
router
  .route('/:state/:park/:campground')
  .get(advanceQuery(Campground), getCampground)
  .put(protect, authorize('contributor', 'admin'), putCampground)
  .delete(protect, authorize('admin'), delCampground);
router
  .route('/:state/:park/:campground/good')
  .put(protect, authorize('user', 'contributor', 'admin'), putGood);
router
  .route('/:state/:park/:campground/bad')
  .put(protect, authorize('user', 'contributor', 'admin'), putBad);
router
  .route('/:state/:park/:campground/photo')
  .put(protect, authorize('user', 'contributor', 'admin'), putPhoto);
router
  .route('/:state/:park')
  .get(advanceQuery(Campground), getPark)
  .delete(protect, authorize('admin'), delPark);
router
  .route('/:state')
  .get(advanceQuery(Campground), getState)
  .post(protect, authorize('user', 'contributor', 'admin'), postCampground);
router
  .route('/parks/:state')
  .get(advanceQuery(Park, null, { fee: 'asc' }), getParksState);

module.exports = router;
