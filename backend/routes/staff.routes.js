const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staff.controller');
const authMiddleware = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', staffController.getStaff);
router.post('/', authMiddleware, upload.single('photo'), staffController.createStaff);
router.put('/:id', authMiddleware, upload.single('photo'), staffController.updateStaff);
router.delete('/:id', authMiddleware, staffController.deleteStaff);

module.exports = router;
