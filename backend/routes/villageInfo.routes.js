const express = require('express');
const router = express.Router();
const villageInfoController = require('../controllers/villageInfo.controller');
const authMiddleware = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', villageInfoController.getAllInfo);
router.get('/:slug', villageInfoController.getInfoBySlug);
router.put('/', authMiddleware, upload.array('images', 10), villageInfoController.updateInfo);

module.exports = router;
