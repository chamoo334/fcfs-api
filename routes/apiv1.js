const express = require('express');
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
} = require('../controllers/v1/campgrounds');
const router = express.Router();

router.route('/campgrounds').get(getCampgrounds);
router.route('/campgrounds/:zipcode/:distance').get(getCampsRadius);
router
  .route('/:state/:park/:campground')
  .get(getCampground)
  .put(putCampground)
  .delete(delCampground);
router.route('/:state/:park/:campground/good').put(putGood);
router.route('/:state/:park/:campground/bad').put(putBad);
router.route('/:state/:park/:campground/photo').put(putPhoto);
router.route('/:state/:park').get(getPark).delete(delPark);
router.route('/:state').get(getState).post(postCampground);

module.exports = router;
