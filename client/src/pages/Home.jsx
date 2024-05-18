import React, { useEffect, useState } from "react";
import Logout from "../components/Logout";
import UploadFile from "../components/UploadFile";
import { useLogin } from "../context/LoginContext";
import { Link } from "react-router-dom";
import SearchDoctor from "../components/SearchDoctor";
import AppointmentList from "../components/ApploinmentList";
import Banner from "../components/Banner";
import OurStatus from "../components/OurStatus";
import AboutUs from "../components/AboutUs";
import OurTeam from "../components/OurTeam";
const Home = () => {
  const { isLoggedIn } = useLogin();
  return (
    <div className="px-32">
      <Banner />
      <OurStatus />
      <AboutUs />
      <OurTeam />
    </div>
  );
};

export default Home;
