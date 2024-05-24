import React, { useEffect, useState } from "react";
import { useLogin } from "../context/LoginContext";
import Banner from "../components/Banner";
import OurStatus from "../components/OurStatus";
import AboutUs from "../components/AboutUs";
import OurTeam from "../components/OurTeam";
import DedicatedDoctor from "../components/DedicatedDoctor";
import PatientTestimonial from "../components/PatientTestimonial";
import GetInTouch from "../components/GetInTouch";
const Home = () => {
  return (
    <div className="px-32">
      <Banner />
      <OurStatus />
      <AboutUs />
      <OurTeam />
      <DedicatedDoctor />
      <PatientTestimonial />
      <GetInTouch />
    </div>
  );
};

export default Home;
