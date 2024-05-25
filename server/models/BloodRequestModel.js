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

// const mongoose = require("mongoose");

// const commentSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   comment: { type: String, required: true }
// });

// const notificationSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   message: { type: String, required: true },
//   read: { type: Boolean, default: false }
// });

// const BloodRequestSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   bloodGroup: { type: String, required: true },
//   quantity: { type: Number, required: true },
//   urgency: { type: String, required: true },
//   country: { type: String, required: true },
//   division: { type: String, required: true },
//   district: { type: String, required: true },
//   city: { type: String, required: true },
//   contactInfo: { type: String, required: true },
//   comments: [commentSchema],
//   notifications: [notificationSchema]
// });

// const BloodRequest = mongoose.model("BloodRequest", BloodRequestSchema);

// module.exports = BloodRequest;

// const mongoose = require("mongoose");

// const BloodRequestSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   bloodGroup: { type: String, required: true },
//   quantity: { type: Number },
//   urgency: { type: String, required: true },
//   country: { type: String },
//   division: { type: String },
//   district: { type: String },
//   city: { type: String },
//   contactInfo: { type: String, required: true },
//   caption: { type: String }, // New field for the caption
//   comments: [
//     {
//       userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//       name: { type: String, ref: "User" },
//       comment: { type: String },
//       createdAt: { type: Date, default: Date.now },
//     },
//   ],
//   createdAt: { type: Date, default: Date.now },
// });

// const BloodRequest = mongoose.model("BloodRequest", BloodRequestSchema);

// module.exports = BloodRequest;


// models/BloodRequestModel.js

const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  comment: { type: String, required: true }
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
  caption: { type: String, required: true },
  comments: [CommentSchema]
}, { timestamps: true });
const BloodRequest = mongoose.model("BloodRequest", BloodRequestSchema);

module.exports = BloodRequest;