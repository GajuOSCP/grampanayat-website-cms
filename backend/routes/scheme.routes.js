const express = require('express');
const router = express.Router();
const schemeController = require('../controllers/scheme.controller');
const authMiddleware = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', schemeController.getSchemes);
router.post('/', authMiddleware, upload.single('image'), schemeController.createScheme);
router.put('/:id', authMiddleware, upload.single('image'), schemeController.updateScheme);
router.delete('/:id', authMiddleware, schemeController.deleteScheme);

module.exports = router;
