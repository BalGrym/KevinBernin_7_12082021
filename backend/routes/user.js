const express = require('express');
const router = express.Router();

const authCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

router.post('/login', authCtrl.login);
router.post('/signup', authCtrl.signup);
router.get('/userInfo', auth, authCtrl.userInfo);
router.put('/userInfo', auth, authCtrl.modifyUserInfo);
router.delete('/userInfo', auth, authCtrl.deleteThread);

module.exports = router;