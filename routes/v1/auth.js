const express = require('express');
const router = express.Router();
const { protect } = require('../../middleware/auth');
const {
  authRegister,
  authLogin,
  getMe,
  forgotPassword,
  resetPassword,
  updateDetails,
  updatePassword,
} = require('../../controllers/v1/auth');

router.post('/register', authRegister);
router.post('/login', authLogin);
// router.get('/logout', logout);
router.get('/me', protect, getMe);
// router.get('/confirmemail', confirmEmail);
router.put('/updatedetails', protect, updateDetails);
router.put('/updatepassword', protect, updatePassword);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);

module.exports = router;
