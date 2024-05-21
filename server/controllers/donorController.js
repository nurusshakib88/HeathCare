const Donor = require('../models/DonorModel');

exports.addDonor = async (req, res) => {
    try {
        const { name, address, bloodGroup, contactInfo } = req.body;
        const newDonor = new Donor({ name, address, bloodGroup, contactInfo });
        await newDonor.save();
        res.status(201).json(newDonor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getDonors = async (req, res) => {
    try {
        const donors = await Donor.find();
        res.status(200).json(donors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateDonor = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedDonor = await Donor.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedDonor) return res.status(404).json({ message: 'Donor not found' });
        res.status(200).json(updatedDonor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteDonor = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedDonor = await Donor.findByIdAndDelete(id);
        if (!deletedDonor) return res.status(404).json({ message: 'Donor not found' });
        res.status(200).json({ message: 'Donor deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
