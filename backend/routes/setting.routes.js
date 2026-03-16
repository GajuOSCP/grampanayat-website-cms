const express = require('express');
const router = express.Router();
const settingController = require('../controllers/setting.controller');
const authMiddleware = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', settingController.getSettings);
router.put('/', authMiddleware, upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'sarpanchPhoto', maxCount: 1 },
    { name: 'heroImages', maxCount: 5 }
]), settingController.updateSettings);

module.exports = router;
