const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Gallery = require('./models/gallery');

dotenv.config();

async function checkGallery() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/gram_panchayat');
        const images = await Gallery.find();
        console.log('Gallery Images Count:', images.length);
        console.log('Images:', JSON.stringify(images, null, 2));
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

checkGallery();
