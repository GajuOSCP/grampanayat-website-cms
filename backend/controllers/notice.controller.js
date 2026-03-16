const Notice = require('../models/notice');

exports.getNotices = async (req, res) => {
    try {
        const notices = await Notice.find().sort({ date: -1 });
        res.json(notices);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createNotice = async (req, res) => {
    try {
        const { title, description, isScrolling } = req.body;
        const pdfUrl = req.file ? `/uploads/${req.file.filename}` : null;
        
        const notice = new Notice({ title, description, isScrolling, pdfUrl });
        await notice.save();
        res.status(201).json(notice);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateNotice = async (req, res) => {
    try {
        const { title, description, isScrolling } = req.body;
        const updateData = { title, description, isScrolling };
        if (req.file) updateData.pdfUrl = `/uploads/${req.file.filename}`;

        const notice = await Notice.findByIdAndUpdate(req.params.id, updateData, { new: true });
        res.json(notice);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteNotice = async (req, res) => {
    try {
        await Notice.findByIdAndDelete(req.params.id);
        res.json({ message: 'Notice deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
