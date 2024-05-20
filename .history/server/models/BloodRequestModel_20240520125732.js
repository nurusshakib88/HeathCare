// const mongoose = require('mongoose');

// const BloodRequestSchema = new mongoose.Schema({
//     userId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     },
//     bloodGroup: {
//         type: String,
//         required: true
//     },
//     quantity: {
//         type: Number,
//         required: true
//     },
//     urgency: {
//         type: String,
//         required: true
//     },
//     country: {
//         type: String,
//         required: true
//     },
//     division: {
//         type: String,
//         required: true
//     },
//     district: {
//         type: String,
//         required: true
//     },
//     city: {
//         type: String,
//         required: true
//     },
//     contactInfo: {
//         type: String,
//         required: true
//     },
//     comments: [{
//         userId: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'User'
//         },
//         comment: String
//     }],
//     notifications: [{
//         userId: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'User'
//         },
//         message: String,
//         read: {
//             type: Boolean,
//             default: false
//         }
//     }]
// });

// module.exports = mongoose.model('BloodRequest', BloodRequestSchema);

const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  comment: { type: String, required: true }
});

const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  message: { type: String, required: true },
  read: { type: Boolean, default: false }
});

const BloodRequestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  bloodGroup: { type: String, required: true },
  quantity: { type: Number, required: true },
  urgency: { type: String, required: true },
  country: { type: String, required: true },
  division: { type: String, required: true },
  district: { type: String, required: true },
  city: { type: String, required: true },
  contactInfo: { type: String, required: true },
  comments: [commentSchema],
  notifications: [notificationSchema]
});

const BloodRequest = mongoose.model("BloodRequest", BloodRequestSchema);

module.exports = BloodRequest;
