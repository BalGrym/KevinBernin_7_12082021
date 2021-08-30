const express = require('express');
const router = express.Router();

const threadCtrl = require('../controllers/thread');
const auth = require('../middleware/auth');

router.get('/', threadCtrl.getAllThreads);
router.get('/:id', threadCtrl.getOneThread);
router.post('/', threadCtrl.createThread);
router.put('/:id', threadCtrl.modifyThread);
router.delete('/:id', threadCtrl.deleteThread);
router.post('/:id/comment', threadCtrl.createComment);
router.get('/:id/comment', threadCtrl.getCommentsByThreadId)

module.exports = router;