//DoctorRoutes.js
const express = require("express");
const router = express.Router();
const DoctorController = require("../controllers/DoctorController");

router.post("/add", DoctorController.createDoctor);
router.get("/all", DoctorController.getAllDoctors);
router.get("/displaydoctor/:id", DoctorController.getDoctorById);
router.delete("/deletedoctor/:id", DoctorController.deleteDoctor);
router.get("/search", DoctorController.searchDoctors);
module.exports = router;
