const mongoose = require('mongoose');

const AmbulanceListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  ambulanceTitle: {
    type: String,
    required: true
  },
  ambulanceNumber: {
    type: String,
    required: true
  },
  icuService: {
    type: Boolean,
    required: true
  },
  contactInfo: {
    type: String,
    required: true
  },
  division: {
    type: String,
  },
  district: {
    type: String,
  },
  city: {
    type: String,
  }
});

module.exports = mongoose.model('Ambulance', AmbulanceListSchema);
