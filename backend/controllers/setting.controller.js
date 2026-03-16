const Setting = require('../models/setting');

exports.getSettings = async (req, res) => {
    try {
        let settings = await Setting.findOne();
        if (!settings) {
            settings = new Setting();
            await settings.save();
        }
        res.json(settings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateSettings = async (req, res) => {
    try {
        let settings = await Setting.findOne();
        if (!settings) settings = new Setting();

        const updateData = req.body;
        
        if (req.files) {
            if (req.files.logo) settings.logoUrl = `/uploads/${req.files.logo[0].filename}`;
            if (req.files.sarpanchPhoto) settings.sarpanchPhoto = `/uploads/${req.files.sarpanchPhoto[0].filename}`;
            if (req.files.heroImages) {
                const newHeroImages = req.files.heroImages.map(file => `/uploads/${file.filename}`);
                settings.heroImages = [...settings.heroImages, ...newHeroImages].slice(-5);
            }
        }

        Object.keys(updateData).forEach(key => {
            if (updateData[key] !== undefined) settings[key] = updateData[key];
        });

        await settings.save();
        res.json(settings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
