const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
    imageUrl: { type: String, required: true },
    category: { type: String, default: 'General' },
    caption: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Gallery', gallerySchema);
