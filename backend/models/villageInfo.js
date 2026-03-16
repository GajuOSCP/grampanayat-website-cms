const mongoose = require('mongoose');

const villageInfoSchema = new mongoose.Schema({
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String },
    content: { type: String },
    images: [{ type: String }],
    mainImage: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('VillageInfo', villageInfoSchema);
