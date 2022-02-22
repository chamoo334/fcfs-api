const express = require('express');
const router = express.Router();
const { protect } = require('../../middleware/auth');
const { authRegister, authLogin, getMe } = require('../../controllers/v1/auth');

// router.route('/register').post(authRegister);
// router.route('/login').post(authLogin);
// router.route('/me').get(getMe);

router.post('/register', authRegister);
router.post('/login', authLogin);
// router.get('/logout', logout);
router.get('/me', protect, getMe);
// router.get('/confirmemail', confirmEmail);
// router.put('/updatedetails', protect, updateDetails);
// router.put('/updatepassword', protect, updatePassword);
// router.post('/forgotpassword', forgotPassword);
// router.put('/resetpassword/:resettoken', resetPassword);

module.exports = router;
