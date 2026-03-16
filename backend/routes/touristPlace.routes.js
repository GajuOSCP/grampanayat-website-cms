const express = require('express');
const router = express.Router();
const touristPlaceController = require('../controllers/touristPlace.controller');
const authMiddleware = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', touristPlaceController.getPlaces);
router.get('/:id', touristPlaceController.getPlaceById);
router.post('/', authMiddleware, upload.array('images', 10), touristPlaceController.addPlace);
router.put('/:id', authMiddleware, upload.array('images', 10), touristPlaceController.updatePlace);
router.delete('/:id', authMiddleware, touristPlaceController.deletePlace);

module.exports = router;
