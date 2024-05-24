// AppointmentController.js
const AppointmentModel = require("../models/AppointmentModel");

const AppointmentController = {
  createAppointment: (req, res) => {
    const { userId, selectedDay, selectedDate, slotStartTime, slotEndTime } =
      req.body;

    // Check if appointment already exists for the same day, date, and slot
    AppointmentModel.findOne({
      userId: userId,
      selectedDay: selectedDay,
      selectedDate: selectedDate,
      slotStartTime: slotStartTime,
      slotEndTime: slotEndTime,
    })
      .then((existingAppointment) => {
        if (existingAppointment) {
          // Appointment already exists, return a message or status indicating it
          return res
            .status(400)
            .json({ message: "Appointment already exists for this slot." });
        } else {
          // Create the appointment since it doesn't already exist
          AppointmentModel.create(req.body)
            .then((appointment) => res.json(appointment))
            .catch((err) => res.status(500).json({ error: err.message }));
        }
      })
      .catch((err) => res.status(500).json({ error: err.message }));
  },

  getAllAppointments: (req, res) => {
    AppointmentModel.find({})
      .then((appointments) => res.json(appointments))
      .catch((err) => res.json(err));
  },

  getAppointmentById: (req, res) => {
    const id = req.params.id;
    AppointmentModel.findById({ _id: id })
      .then((appointments) => res.json(appointments))
      .catch((err) => res.json(err));
  },

  deleteAppointment: (req, res) => {
    const id = req.params.id;
    AppointmentModel.findByIdAndDelete({ _id: id })
      .then((result) => res.json(result))
      .catch((err) => res.json(err));
  },
  editAppointment: (req, res) => {
    const id = req.params.id;
    const updateFields = req.body;

    AppointmentModel.findByIdAndUpdate(id, updateFields, { new: true })
      .then((updatedAppointment) => {
        if (!updatedAppointment) {
          return res.status(404).json({ message: "Appointment not found" });
        }
        res.json(updatedAppointment);
      })
      .catch((err) => res.status(500).json({ error: err.message }));
  },
};

module.exports = AppointmentController;
