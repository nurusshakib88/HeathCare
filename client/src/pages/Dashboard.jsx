import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import {
  Add,
  CalendarMonth,
  Inventory,
  LogoutOutlined,
  Medication,
  PeopleAlt,
  WaterDrop,
} from "@mui/icons-material";
import Logout from "../components/Logout";
import AllAppointments from "../components/AllAppointments";
import AddDoctor from "../components/AddDoctor";
import AllDoctors from "../components/AllDoctors";
import Allusers from "../components/Allusers";
import DashboardNav from "../components/DashboardNav";
import BloodInventory from "./BloodInventory";
import BloodDonorList from "./BloodDonorList";

const Dashboard = () => {
  const [success, setSuccess] = useState(false); // Initialize success state
  const [currentComponent, setCurrentComponent] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get(`/api/dashboard`)
      .then((res) => {
        if (res.data === "Success") {
          setSuccess(true); // Set success state to true if login is successful
          const params = new URLSearchParams(location.search);
          const view = params.get("view");
          if (view) {
            setCurrentComponent(view);
          }
        } else {
          navigate("/"); // Redirect to login page if not authenticated
        }
      })
      .catch((err) => console.log(err));
  }, [navigate, location.search]);

  const handleNavigation = (component) => {
    setCurrentComponent(component);
    navigate(`?view=${component}`);
  };

  const renderComponent = () => {
    switch (currentComponent) {
      case "AddDoctor":
        return <AddDoctor />;
      case "AllDoctors":
        return <AllDoctors />;
      case "AllAppointments":
        return <AllAppointments />;
      case "AllUsers":
        return <Allusers />;
      case "BloodInventory":
        return <BloodInventory />;
      case "BloodDonorList":
        return <BloodDonorList />;
      default:
        return (
          <div className="h-[90vh] flex items-center justify-center text-6xl px-10 text-center font-bold capitalize">
            Welcome to admin dashboard
          </div>
        );
    }
  };

  return success ? (
    <div className="flex">
      <aside className="bg-primary pt-5 px-1 w-64 text-secondary shadow-2xl z-50 h-screen flex flex-col justify-between">
        <div>
          <div className="px-2">
            <h1 className="font-bold text-2xl">Dashboard</h1>
            <p className="mb-5">Admin</p>
          </div>

          <div className="flex flex-col">
            <button
              onClick={() => handleNavigation("AddDoctor")}
              className="flex gap-2 hover:bg-secondary hover:text-primary transition-all duration-300 ease-in-out px-2 py-3"
            >
              <Add /> Add Doctor
            </button>
            <button
              onClick={() => handleNavigation("AllDoctors")}
              className="flex gap-2 hover:bg-secondary hover:text-primary transition-all duration-300 ease-in-out px-2 py-3"
            >
              <Medication /> All Doctors
            </button>
            <button
              onClick={() => handleNavigation("AllAppointments")}
              className="flex gap-2 hover:bg-secondary hover:text-primary transition-all duration-300 ease-in-out px-2 py-3"
            >
              <CalendarMonth /> All Appointments
            </button>
            <button
              onClick={() => handleNavigation("AllUsers")}
              className="flex gap-2 hover:bg-secondary hover:text-primary transition-all duration-300 ease-in-out px-2 py-3"
            >
              <PeopleAlt /> All Users
            </button>
            <button
              onClick={() => handleNavigation("BloodInventory")}
              className="flex gap-2 hover:bg-secondary hover:text-primary transition-all duration-300 ease-in-out px-2 py-3"
            >
              <Inventory /> Blood Inventory
            </button>
            <button
              onClick={() => handleNavigation("BloodDonorList")}
              className="flex gap-2 hover:bg-secondary hover:text-primary transition-all duration-300 ease-in-out px-2 py-3"
            >
              <WaterDrop /> Blood Donor List
            </button>
          </div>
        </div>
        <Logout
          icon={<LogoutOutlined />}
          className="flex gap-2 hover:bg-secondary hover:text-primary transition-all duration-300 ease-in-out px-2 py-3 border-t"
        />
      </aside>
      <div className="w-full h-screen overflow-y-auto">
        <DashboardNav />
        {renderComponent()}
      </div>
    </div>
  ) : null;
};

export default Dashboard;
