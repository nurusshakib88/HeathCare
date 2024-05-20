const BloodRequest = require('../models/BloodRequestModel');
const UserModel = require('../models/UserModel');

exports.createBloodRequest = async (req, res) => {
    try {
        const { userId, bloodGroup, quantity, urgency, country, division, district, city, contactInfo } = req.body;
        const newRequest = new BloodRequest({ userId, bloodGroup, quantity, urgency, country, division, district, city, contactInfo });
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
        if (!request) {
            return res.status(404).json({ message: 'Blood request not found' });
        }
        request.comments.push({ userId, comment });

        // Add notification for the owner of the blood request
        const user = await UserModel.findById(request.userId);
        request.notifications.push({
            userId: request.userId,
            message: `You have a new comment on your blood request from ${user.name}`
        });

        await request.save();
        res.status(200).json(request);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// New method to get notifications for a user

// exports.getNotifications = async (req, res) => {
//     try {
//         const { userId } = req.params;
//         const requests = await BloodRequest.find({ 'notifications.userId': userId }).populate('notifications.userId', 'name');
//         const notifications = requests.flatMap(request => request.notifications.filter(notification => notification.userId.toString() === userId));
//         res.status(200).json(notifications);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

exports.getAllBloodRequests = async (req, res) => {
    try {
        const bloodRequests = await BloodRequest.find().populate('userId', 'name');
        res.status(200).json(bloodRequests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add more methods as needed (update, delete)
