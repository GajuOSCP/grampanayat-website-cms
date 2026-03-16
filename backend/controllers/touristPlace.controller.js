const TouristPlace = require('../models/touristPlace');

exports.getPlaces = async (req, res) => {
    try {
        const places = await TouristPlace.find().sort({ createdAt: -1 });
        res.json(places);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getPlaceById = async (req, res) => {
    try {
        const place = await TouristPlace.findById(req.params.id);
        if (!place) return res.status(404).json({ message: 'ठिकाण सापडले नाही' });
        res.json(place);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.addPlace = async (req, res) => {
    try {
        const { name, description, history, location } = req.body;
        const images = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];
        
        const newPlace = new TouristPlace({
            name,
            description,
            history,
            location,
            images,
            mainImage: images[0] || ''
        });

        await newPlace.save();
        res.status(201).json(newPlace);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updatePlace = async (req, res) => {
    try {
        const { name, description, history, location } = req.body;
        const updateData = { name, description, history, location };
        
        if (req.files && req.files.length > 0) {
            const newImages = req.files.map(file => `/uploads/${file.filename}`);
            updateData.images = newImages;
            updateData.mainImage = newImages[0];
        }

        const updatedPlace = await TouristPlace.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );
        res.json(updatedPlace);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deletePlace = async (req, res) => {
    try {
        await TouristPlace.findByIdAndDelete(req.params.id);
        res.json({ message: 'ठिकाण हटवले' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
