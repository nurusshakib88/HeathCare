const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const UserRoutes = require("./routes/UserRoutes");
const DoctorRoutes = require("./routes/DoctorRoutes");
const AppointmentRoutes = require("./routes/AppointmentRoutes");
const BloodInventoryRoutes = require("./routes/BloodInventoryRoutes");
const BloodRequestRoutes = require("./routes/BloodRequestRoutes");
const DonorRoutes = require("./routes/DonorRoutes");
const BloodPostRoutes = require("./routes/BloodPostRoutes");
const AmbulanceRoute = require("./routes/AmbulanceRoute");

require("dotenv").config();

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: process.env.ReactUrl,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());

const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI);

app.use("/", UserRoutes);
app.use("/doctors", DoctorRoutes);
app.use("/appointments", AppointmentRoutes);
app.use("/blood-inventory", BloodInventoryRoutes);
app.use("/blood-requests", BloodRequestRoutes);
app.use("/donors", DonorRoutes);
app.use("/", BloodPostRoutes);
app.use("/ambulances", AmbulanceRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
