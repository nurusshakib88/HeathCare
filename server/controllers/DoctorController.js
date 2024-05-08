// doctorController.js
const DoctorModel = require("../models/DoctorModel");

const DoctorController = {
  createDoctor: (req, res) => {
    DoctorModel.create(req.body)
      .then((doctors) => res.json(doctors))
      .catch((err) => res.json(err));
  },

  getAllDoctors: (req, res) => {
    DoctorModel.find({})
      .then((doctors) => res.json(doctors))
      .catch((err) => res.json(err));
  },
  getDoctorById: (req, res) => {
    const id = req.params.id;
    DoctorModel.findById({ _id: id })
      .then((doctors) => res.json(doctors))
      .catch((err) => res.json(err));
  },
  deleteDoctor: (req, res) => {
    const id = req.params.id;
    DoctorModel.findByIdAndDelete({ _id: id })
      .then((result) => res.json(result))
      .catch((err) => res.json(err));
  },


  searchDoctors: (req, res) => {
    const { day, areaDivision, district } = req.query;
    let query = {};

    if (day) {
      query["availability.day"] = day; // Assuming "availability" is an array of objects with "day" property
    }
    if (areaDivision) {
      query.areaDivision = areaDivision; // Assuming areaDivision is a property in your DoctorModel
    }
    if (district) {
      query.district = district; // Assuming district is a property in your DoctorModel
    }

    DoctorModel.find(query)
      .then((doctors) => res.json(doctors))
      .catch((err) => res.json(err));
  },
};

module.exports = DoctorController;
