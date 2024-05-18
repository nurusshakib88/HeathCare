const BloodRequest = require('../models/BloodRequestModel');

exports.createBloodRequest = async (req, res) => {
    try {
        const { userId, bloodGroup, quantity, urgency, country, city, contactInfo } = req.body;
        const newRequest = new BloodRequest({ userId, bloodGroup, quantity, urgency, country, city, contactInfo });
        await newRequest.save();
        res.status(201).json(newRequest);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getBloodRequests = async (req, res) => {
    try {
        const requests = await BloodRequest.find().populate('userId', 'name');
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addComment = async (req, res) => {
    try {
        const { requestId, userId, comment } = req.body;
        const request = await BloodRequest.findById(requestId);
        request.comments.push({ userId, comment });
        await request.save();
        res.status(200).json(request);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add more methods as needed (update, delete)
