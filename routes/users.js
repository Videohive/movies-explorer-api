const router = require('express').Router();
const { validateUserData } = require('../utils/validate/userValidate');
const { getCurrentUser, updateUserInfo } = require('../controllers/users');

router.get('/me', getCurrentUser);
router.patch('/me', validateUserData, updateUserInfo);

module.exports = router;
