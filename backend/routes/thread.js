const express = require('express');
const router = express.Router();

const threadCtrl = require('../controllers/thread');

router.get('/', threadCtrl.getAllThreads);
router.get('/:id', threadCtrl.getOneThread);
router.post('/', threadCtrl.createThread);
router.put('/:id', threadCtrl.modifyThread);
router.delete('/:id', threadCtrl.deleteThread)

module.exports = router;