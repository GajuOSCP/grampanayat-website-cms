const Gallery = require('../models/gallery');

exports.getGallery = async (req, res) => {
    try {
        const images = await Gallery.find().sort({ createdAt: -1 });
        res.json(images);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.uploadImages = async (req, res) => {
    try {
        const { category, caption } = req.body;
        const images = req.files.map(file => ({
            imageUrl: `/uploads/${file.filename}`,
            category: category || 'General',
            caption: caption || ''
        }));
        
        await Gallery.insertMany(images);
        res.status(201).json({ message: 'Images uploaded successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteImage = async (req, res) => {
    try {
        await Gallery.findByIdAndDelete(req.params.id);
        res.json({ message: 'फोटो यशस्वीरित्या हटवला' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateImage = async (req, res) => {
    try {
        const { category, caption } = req.body;
        const updatedImage = await Gallery.findByIdAndUpdate(
            req.params.id,
            { category, caption },
            { new: true }
        );
        res.json(updatedImage);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
