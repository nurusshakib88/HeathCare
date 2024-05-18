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

// Add more methods as needed (update, delete)
