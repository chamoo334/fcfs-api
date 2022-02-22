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

router.route('/campgrounds').get(getCampgrounds);
router.route('/campgrounds/:zipcode/:distance').get(getCampsRadius);
router
  .route('/:state/:park/:campground')
  .get(getCampground)
  .put(protect, authorize('contributor', 'admin'), putCampground)
  .delete(protect, authorize('admin'), delCampground);
router
  .route('/:state/:park/:campground/good')
  .put(protect, authorize('user', 'admin'), putGood);
router
  .route('/:state/:park/:campground/bad')
  .put(protect, authorize('user', 'admin'), putBad);
router
  .route('/:state/:park/:campground/photo')
  .put(protect, authorize('user', 'admin'), putPhoto);
router
  .route('/:state/:park')
  .get(getPark)
  .delete(protect, authorize('admin'), delPark);
router
  .route('/:state')
  .get(getState)
  .post(protect, authorize('user', 'admin'), postCampground);

module.exports = router;
