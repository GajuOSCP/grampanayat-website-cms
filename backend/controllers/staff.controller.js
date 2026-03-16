const Staff = require('../models/staff');

exports.getStaff = async (req, res) => {
    try {
        const staff = await Staff.find().sort({ designation: 1 });
        res.json(staff);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createStaff = async (req, res) => {
    try {
        const staffData = req.body;
        if (req.file) staffData.photoUrl = `/uploads/${req.file.filename}`;
        const staff = new Staff(staffData);
        await staff.save();
        res.status(201).json(staff);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateStaff = async (req, res) => {
    try {
        const staffData = req.body;
        if (req.file) staffData.photoUrl = `/uploads/${req.file.filename}`;
        const staff = await Staff.findByIdAndUpdate(req.params.id, staffData, { new: true });
        res.json(staff);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteStaff = async (req, res) => {
    try {
        await Staff.findByIdAndDelete(req.params.id);
        res.json({ message: 'Staff deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
