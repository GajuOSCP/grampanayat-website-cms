const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
    panchayatName: { type: String, default: 'Gram Panchayat' },
    taluka: { type: String },
    district: { type: String },
    state: { type: String, default: 'Maharashtra' },
    address: { type: String },
    phone: { type: String },
    email: { type: String },
    logoUrl: { type: String },
    heroImages: [String],
    aboutText: { type: String },
    history: { type: String },
    vision: { type: String },
    // Village Stats
    area: { type: String },
    wards: { type: String },
    schools: { type: String },
    healthCenters: { type: String },
    waterCapacity: { type: String },
    electrification: { type: String },
    sarpanchName: { type: String },
    sarpanchPhoto: { type: String },
    googleMapUrl: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Setting', settingSchema);
