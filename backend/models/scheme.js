const mongoose = require('mongoose');

const schemeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    benefits: { type: String },
    eligibility: { type: String },
    imageUrl: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Scheme', schemeSchema);
