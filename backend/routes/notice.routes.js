const express = require('express');
const router = express.Router();
const noticeController = require('../controllers/notice.controller');
const authMiddleware = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', noticeController.getNotices);
router.post('/', authMiddleware, upload.single('pdf'), noticeController.createNotice);
router.put('/:id', authMiddleware, upload.single('pdf'), noticeController.updateNotice);
router.delete('/:id', authMiddleware, noticeController.deleteNotice);

module.exports = router;
