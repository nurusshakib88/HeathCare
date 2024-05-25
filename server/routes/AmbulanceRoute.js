const express = require('express');
const {
  addAmbulance,
  getAllAmbulances,
  getAmbulanceById,
  updateAmbulance,
  deleteAmbulance,
} = require('../controllers/ambulanceController');
const router = express.Router();

// Route to add a new ambulance
router.post('/', addAmbulance);

// Route to get all ambulances
router.get('/', getAllAmbulances);

// Route to get a specific ambulance by ID
router.get('/:id', getAmbulanceById);

// Route to update a specific ambulance by ID
router.put('/:id', updateAmbulance);

// Route to delete a specific ambulance by ID
router.delete('/:id', deleteAmbulance);

module.exports = router;