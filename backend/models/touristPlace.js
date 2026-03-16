const mongoose = require('mongoose');

const touristPlaceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    history: { type: String },
    location: { type: String },
    images: [{ type: String }],
    mainImage: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('TouristPlace', touristPlaceSchema);
