const express = require('express');
const router = express.Router();

const threadCtrl = require('../controllers/thread');
const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');
const verificationUser = require('../middleware/verificationUser');

router.get('/', auth, threadCtrl.getAllThreads);
router.get('/:id', auth, threadCtrl.getOneThread);
router.post('/', auth, threadCtrl.createThread);
router.put('/:id', auth, verificationUser, threadCtrl.modifyThread);
router.delete('/:id', auth, verificationUser, threadCtrl.deleteThread);
router.post('/:id/comment', auth, commentCtrl.createComment);
router.get('/:id/comment', auth, commentCtrl.getCommentsByThreadId)

module.exports = router;