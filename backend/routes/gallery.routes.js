const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/gallery.controller');
const authMiddleware = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', galleryController.getGallery);
router.post('/', authMiddleware, upload.array('images', 10), galleryController.uploadImages);
router.put('/:id', authMiddleware, galleryController.updateImage);
router.delete('/:id', authMiddleware, galleryController.deleteImage);

module.exports = router;
