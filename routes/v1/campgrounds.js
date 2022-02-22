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
const { protect } = require('../../middleware/auth');

router.route('/campgrounds').get(getCampgrounds);
router.route('/campgrounds/:zipcode/:distance').get(getCampsRadius);
router
  .route('/:state/:park/:campground')
  .get(getCampground)
  .put(protect, putCampground)
  .delete(delCampground);
router.route('/:state/:park/:campground/good').put(protect, putGood);
router.route('/:state/:park/:campground/bad').put(protect, putBad);
router.route('/:state/:park/:campground/photo').put(protect, putPhoto);
router.route('/:state/:park').get(getPark).delete(delPark);
router.route('/:state').get(getState).post(protect, postCampground);

module.exports = router;
