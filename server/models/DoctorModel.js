const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
  name: String,
  area: String,
  visit: String,
  degree: String,
  role: {
    type: String,
    default: "doctor",
  },
  selectedDivision: String,
  selectedDistrict: String,
  imageUrl: String,
  availability: [
    {
      day: String,
      startTime: String,
      endTime: String,
    },
  ],
});

const DoctorModel = mongoose.model("doctors", DoctorSchema);

module.exports = DoctorModel;
