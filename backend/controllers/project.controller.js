const Project = require('../models/project');

exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createProject = async (req, res) => {
    try {
        const { title, description, location, status } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
        
        const project = new Project({ title, description, location, status, imageUrl });
        await project.save();
        res.status(201).json(project);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateProject = async (req, res) => {
    try {
        const { title, description, location, status } = req.body;
        const updateData = { title, description, location, status };
        if (req.file) updateData.imageUrl = `/uploads/${req.file.filename}`;

        const project = await Project.findByIdAndUpdate(req.params.id, updateData, { new: true });
        res.json(project);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteProject = async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        res.json({ message: 'Project deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
