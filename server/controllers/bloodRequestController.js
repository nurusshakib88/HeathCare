// const BloodRequest = require('../models/BloodRequestModel');
// const UserModel = require('../models/UserModel');

// exports.createBloodRequest = async (req, res) => {
//     try {
//         const { userId, bloodGroup, quantity, urgency, country, division, district, city, contactInfo } = req.body;
//         const newRequest = new BloodRequest({ userId, bloodGroup, quantity, urgency, country, division, district, city, contactInfo });
//         await newRequest.save();
//         res.status(201).json(newRequest);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// exports.getBloodRequests = async (req, res) => {
//     try {
//         const requests = await BloodRequest.find().populate('userId', 'name');
//         res.status(200).json(requests);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// exports.addComment = async (req, res) => {
//     try {
//         const { requestId, userId, comment } = req.body;
//         const request = await BloodRequest.findById(requestId);
//         if (!request) {
//             return res.status(404).json({ message: 'Blood request not found' });
//         }
//         request.comments.push({ userId, comment });

//         // Add notification for the owner of the blood request
//         const user = await UserModel.findById(request.userId);
//         request.notifications.push({
//             userId: request.userId,
//             message: `You have a new comment on your blood request from ${user.name}`
//         });

//         await request.save();
//         res.status(200).json(request);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // exports.getNotifications = async (req, res) => {
// //     try {
// //         const { userId } = req.params;
// //         const requests = await BloodRequest.find({ 'notifications.userId': userId }).populate('notifications.userId', 'name');
// //         const notifications = requests.flatMap(request => request.notifications.filter(notification => notification.userId.toString() === userId));
// //         res.status(200).json(notifications);
// //     } catch (error) {
// //         res.status(500).json({ message: error.message });
// //     }
// // };
// exports.getNotifications = async (req, res) => {
//     try {
//         const { userId } = req.params;

//         // Find all blood requests where the user is the recipient of notifications
//         const bloodRequests = await BloodRequest.find({ 'notifications.userId': userId })
//             .populate('notifications.userId', 'name')
//             .select('notifications');

//         // Flatten and filter notifications
//         const notifications = bloodRequests.flatMap(request => request.notifications.filter(notification => notification.userId.toString() === userId));

//         res.status(200).json(notifications);
//     } catch (error) {
//         console.error(`Error retrieving notifications: ${error.message}`);
//         res.status(500).json({ message: error.message });
//     }
// };

// exports.getAllBloodRequests = async (req, res) => {
//     try {
//         const bloodRequests = await BloodRequest.find().populate('userId', 'name');
//         res.status(200).json(bloodRequests);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // Add more methods as needed (update, delete)

// const BloodRequest = require("../models/BloodRequestModel");
// const UserModel = require("../models/UserModel");

// exports.createBloodRequest = async (req, res) => {
//     try {
//         const { userId, bloodGroup, quantity, urgency, country, division, district, city, contactInfo } = req.body;
//         const newRequest = new BloodRequest({ userId, bloodGroup, quantity, urgency, country, division, district, city, contactInfo });
//         await newRequest.save();
//         res.status(201).json(newRequest);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// exports.getBloodRequests = async (req, res) => {
//     try {
//         const requests = await BloodRequest.find().populate('userId', 'name');
//         res.status(200).json(requests);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// exports.addComment = async (req, res) => {
//     try {
//         const { requestId, userId, comment } = req.body;
//         const request = await BloodRequest.findById(requestId);
//         if (!request) {
//             return res.status(404).json({ message: 'Blood request not found' });
//         }
//         request.comments.push({ userId, comment });

//         // Add notification for the owner of the blood request
//         const user = await UserModel.findById(request.userId);
//         request.notifications.push({
//             userId: request.userId,
//             message: `You have a new comment on your blood request from ${user.name}`
//         });

//         await request.save();
//         res.status(200).json(request);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

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

// exports.getAllBloodRequests = async (req, res) => {
//     try {
//         const bloodRequests = await BloodRequest.find().populate('userId', 'name');
//         res.status(200).json(bloodRequests);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

const BloodRequest = require("../models/BloodRequestModel");

exports.createBloodRequest = async (req, res) => {
  try {
    const {
      name,
      userId,
      bloodGroup,
      quantity,
      urgency,
      country,
      division,
      district,
      city,
      contactInfo,
      caption,
    } = req.body;
    const newRequest = new BloodRequest({
      name,
      userId,
      bloodGroup,
      quantity,
      urgency,
      country,
      division,
      district,
      city,
      contactInfo,
      caption,
    });
    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getAllBloodRequests = async (req, res) => {
  try {
    const bloodRequests = await BloodRequest.find()
      .populate('userId', 'name') // Populate user details for the blood request
      .populate('comments.userId', 'name') // Populate user details for the comments
      .sort({ createdAt: -1 });

    res.status(200).json(bloodRequests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.addComment = async (req, res) => {
  try {
    const { requestId, userId, comment } = req.body;
    const request = await BloodRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: "Blood request not found" });
    }
    request.comments.push({ userId, comment });
    await request.save();
    await request.populate('comments.userId', 'name'); // Populate user details for the new comment
    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateBloodRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      bloodGroup,
      quantity,
      urgency,
      country,
      division,
      district,
      city,
      contactInfo,
      caption,
    } = req.body;
    const updatedRequest = await BloodRequest.findByIdAndUpdate(
      id,
      {
        bloodGroup,
        quantity,
        urgency,
        country,
        division,
        district,
        city,
        contactInfo,
        caption,
      },
      { new: true }
    );
    res.status(200).json(updatedRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteBloodRequest = async (req, res) => {
  try {
    const { id } = req.params;
    await BloodRequest.findByIdAndDelete(id);
    res.status(200).json({ message: "Blood request deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;
    const request = await BloodRequest.findOneAndUpdate(
      { "comments._id": id },
      { $set: { "comments.$.comment": comment } },
      { new: true }
    );
    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    await BloodRequest.updateOne({}, { $pull: { comments: { _id: id } } });
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
