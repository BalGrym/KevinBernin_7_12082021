const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');

router.post('/:id/comment', auth, commentCtrl.createComment);
router.get('/:id/comment', auth, commentCtrl.getCommentsByThreadId);

module.exports = router;