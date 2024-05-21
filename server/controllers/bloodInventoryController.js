const BloodInventory = require('../models/BloodInventoryModel');

exports.addBloodInventory = async (req, res) => {
    try {
        const { bloodGroup, quantity, country, city, district, division } = req.body;
        const newInventory = new BloodInventory({ bloodGroup, quantity, country, city, district, division });
        await newInventory.save();
        res.status(201).json(newInventory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getBloodInventory = async (req, res) => {
    try {
        const inventory = await BloodInventory.find();
        res.status(200).json(inventory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateBloodInventory = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedInventory = await BloodInventory.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedInventory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteBloodInventory = async (req, res) => {
    try {
        const { id } = req.params;
        await BloodInventory.findByIdAndDelete(id);
        res.status(200).json({ message: 'Blood inventory deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
