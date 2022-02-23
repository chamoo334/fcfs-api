const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../../middleware/auth');
const gq = require('../../middleware/generalQuery');
const User = require('../../models/User');
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../../controllers/v1/users');

router.use(protect);
router.use(authorize('admin'));
router.route('/').get(gq.advanceQuery(User), getUsers).post(createUser);
router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
