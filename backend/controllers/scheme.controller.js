const Scheme = require('../models/scheme');

exports.getSchemes = async (req, res) => {
    try {
        const schemes = await Scheme.find().sort({ createdAt: -1 });
        res.json(schemes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createScheme = async (req, res) => {
    try {
        const schemeData = req.body;
        if (req.file) schemeData.imageUrl = `/uploads/${req.file.filename}`;
        const scheme = new Scheme(schemeData);
        await scheme.save();
        res.status(201).json(scheme);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateScheme = async (req, res) => {
    try {
        const schemeData = req.body;
        if (req.file) schemeData.imageUrl = `/uploads/${req.file.filename}`;
        const scheme = await Scheme.findByIdAndUpdate(req.params.id, schemeData, { new: true });
        res.json(scheme);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteScheme = async (req, res) => {
    try {
        await Scheme.findByIdAndDelete(req.params.id);
        res.json({ message: 'Scheme deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
