const BloodInventory = require('../models/BloodInventoryModel');

exports.addBloodInventory = async (req, res) => {
    try {
        const { bloodGroup, quantity, country, city } = req.body;
        const newInventory = new BloodInventory({ bloodGroup, quantity, country, city });
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

// Add more methods as needed (update, delete)
