const VillageInfo = require('../models/villageInfo');

exports.getInfoBySlug = async (req, res) => {
    try {
        const info = await VillageInfo.findOne({ slug: req.params.slug });
        if (!info) return res.status(404).json({ message: 'माहिती सापडली नाही' });
        res.json(info);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getAllInfo = async (req, res) => {
    try {
        const infos = await VillageInfo.find();
        res.json(infos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateInfo = async (req, res) => {
    try {
        const { title, description, content, slug } = req.body;
        const updateData = { title, description, content };
        
        if (req.files && req.files.length > 0) {
            updateData.images = req.files.map(file => `/uploads/${file.filename}`);
            updateData.mainImage = updateData.images[0];
        }

        const info = await VillageInfo.findOneAndUpdate(
            { slug: slug },
            { $set: updateData },
            { new: true, upsert: true }
        );
        res.json(info);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
