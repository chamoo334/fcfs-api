const express = require('express');
const router = express.Router();
const {
  getCampgrounds,
  getCampsRadius,
  getState,
  getPark,
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
const gq = require('../../middleware/generalQuery');
const Campground = require('../../models/Campground');

// await genDs.advanceQuery(Campground, req, res);
// model, need = null, order = null, populate = null

router.route('/campgrounds').get(gq.advanceQuery(Campground), getCampgrounds);
router
  .route('/campgrounds/:zipcode/:distance')
  .get(advanceQuery(Campground, null, { fee: 'asc' }), getCampsRadius);
router
  .route('/:state/:park/:campground')
  .get(gq.advanceQuery(Campground), getCampground)
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
  .get(gq.advanceQuery(Campground), getPark)
  .delete(protect, authorize('admin'), delPark);
router
  .route('/:state')
  .get(gq.advanceQuery(Campground), getState)
  .post(protect, authorize('user', 'contributor', 'admin'), postCampground);

module.exports = router;
