import React, { useEffect, useState } from "react";
import Logout from "../components/Logout";
import UploadFile from "../components/UploadFile";
import { useLogin } from "../context/LoginContext";
import { Link } from "react-router-dom";
import SearchDoctor from "../components/SearchDoctor";
import AppointmentList from "../components/ApploinmentList";
const Home = () => {
  const { isLoggedIn } = useLogin();
  return (
    <>
      <div>
        Home
        <div>
          <UploadFile />
        </div>
        {isLoggedIn ? (
          <Logout />
        ) : (
          <Link className="btn" to="/login">
            Login
          </Link>
        )}
      </div>

      <SearchDoctor />
      <AppointmentList />
    </>
  );
};

export default Home;
