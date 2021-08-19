const express = require('express');
const router = express.Router();

const threadCtrl = require('../controllers/thread');
const auth = require('../middleware/auth');

router.get('/', auth, threadCtrl.getAllThreads);
router.get('/:id', auth, threadCtrl.getOneThread);
router.post('/', auth, threadCtrl.createThread);
router.put('/:id', auth, threadCtrl.modifyThread);
router.delete('/:id', auth, threadCtrl.deleteThread)

module.exports = router;