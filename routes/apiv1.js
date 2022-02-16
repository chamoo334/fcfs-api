const express = require('express');
const {
  getCampgrounds,
  getState,
  getPark,
  getCampground,
  postPark,
  postState,
  putCampground,
  putGood,
  putBad,
  delPark,
  delCampground,
} = require('../controllers/v1');
const router = express.Router();

router.route('/campgrounds').get(getCampgrounds);
router
  .route('/:state/:parkID/:campgroundID')
  .get(getCampground)
  .put(putCampground)
  .delete(delCampground);
router.route('/:state/:parkID/:campgroundID/good').put(putGood);
router.route('/:state/:parkID/:campgroundID/bad').put(putBad);
router.route('/:state/:parkID').get(getPark).post(postPark).delete(delPark);
router.route('/:state').get(getState).post(postState);

module.exports = router;
