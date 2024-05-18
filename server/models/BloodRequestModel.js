const mongoose = require('mongoose');

const BloodRequestSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bloodGroup: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    urgency: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    contactInfo: {
        type: String,
        required: true
    },
    comments: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        comment: String
    }]
});

module.exports = mongoose.model('BloodRequest', BloodRequestSchema);
