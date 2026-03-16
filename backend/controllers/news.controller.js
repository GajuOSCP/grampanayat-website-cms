const News = require('../models/news');

exports.getAllNews = async (req, res) => {
    try {
        const news = await News.find().sort({ date: -1 });
        res.json(news);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getNewsById = async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        if (!news) return res.status(404).json({ message: 'News not found' });
        res.json(news);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createNews = async (req, res) => {
    try {
        const { title, content, date } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
        
        const news = new News({ title, content, date, imageUrl });
        await news.save();
        res.status(201).json(news);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateNews = async (req, res) => {
    try {
        const { title, content, date } = req.body;
        const updateData = { title, content, date };
        if (req.file) updateData.imageUrl = `/uploads/${req.file.filename}`;

        const news = await News.findByIdAndUpdate(req.params.id, updateData, { new: true });
        res.json(news);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteNews = async (req, res) => {
    try {
        await News.findByIdAndDelete(req.params.id);
        res.json({ message: 'News deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
