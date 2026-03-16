const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String }, // Icon name from lucide
    externalLink: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
