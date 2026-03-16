const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
    name: { type: String, required: true },
    designation: { type: String, required: true },
    photoUrl: { type: String },
    phone: { type: String },
    type: { type: String, enum: ['member', 'staff'], default: 'member' }
}, { timestamps: true });

module.exports = mongoose.model('Staff', staffSchema);
