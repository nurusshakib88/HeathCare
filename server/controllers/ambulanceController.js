const Ambulance = require('../models/AmbulanceListModal'); 

// Add a new ambulance
const addAmbulance = async (req, res) => {
  try {
    const newAmbulance = new Ambulance(req.body);
    const savedAmbulance = await newAmbulance.save();
    res.status(201).json(savedAmbulance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all ambulances
const getAllAmbulances = async (req, res) => {
  try {
    const ambulances = await Ambulance.find();
    res.status(200).json(ambulances);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get an ambulance by ID
const getAmbulanceById = async (req, res) => {
  try {
    const ambulance = await Ambulance.findById(req.params.id);
    if (!ambulance) {
      return res.status(404).json({ message: 'Ambulance not found' });
    }
    res.status(200).json(ambulance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an ambulance by ID
const updateAmbulance = async (req, res) => {
  try {
    const updatedAmbulance = await Ambulance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedAmbulance) {
      return res.status(404).json({ message: 'Ambulance not found' });
    }
    res.status(200).json(updatedAmbulance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an ambulance by ID
const deleteAmbulance = async (req, res) => {
  try {
    const deletedAmbulance = await Ambulance.findByIdAndDelete(req.params.id);
    if (!deletedAmbulance) {
      return res.status(404).json({ message: 'Ambulance not found' });
    }
    res.status(200).json({ message: 'Ambulance deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addAmbulance,
  getAllAmbulances,
  getAmbulanceById,
  updateAmbulance,
  deleteAmbulance,
};