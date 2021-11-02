const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');

// router.post('/', auth, commentCtrl.createComment);
router.get('/', auth, commentCtrl.getCommentsByThreadId);

module.exports = router;