const mongoose = require('mongoose');

const BloodInventorySchema = new mongoose.Schema({
    bloodGroup: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    division: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('BloodInventory', BloodInventorySchema);
