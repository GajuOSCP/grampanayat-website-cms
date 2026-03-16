const express = require('express');
const router = express.Router();
const newsController = require('../controllers/news.controller');
const authMiddleware = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', newsController.getAllNews);
router.get('/:id', newsController.getNewsById);
router.post('/', authMiddleware, upload.single('image'), newsController.createNews);
router.put('/:id', authMiddleware, upload.single('image'), newsController.updateNews);
router.delete('/:id', authMiddleware, newsController.deleteNews);

module.exports = router;
