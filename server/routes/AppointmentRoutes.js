// AppointmentRoutes.js
const express = require("express");
const router = express.Router();
const AppointmentController = require("../controllers/AppointmentController");

router.post("/add", AppointmentController.createAppointment);
router.get("/all", AppointmentController.getAllAppointments);
router.get("/displayappointment/:id", AppointmentController.getAppointmentById);
router.delete(
  "/deleteappointment/:id",
  AppointmentController.deleteAppointment
);
router.put("/editappointment/:id", AppointmentController.editAppointment);

module.exports = router;
