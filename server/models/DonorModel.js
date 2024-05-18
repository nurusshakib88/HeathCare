const mongoose = require('mongoose');

const DonorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    bloodGroup: {
        type: String,
        required: true
    },
    contactInfo: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Donor', DonorSchema);
