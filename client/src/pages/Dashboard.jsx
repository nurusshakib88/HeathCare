import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import AddDoctor from "../components/AddDoctor";
import AllDoctors from "../components/AllDoctors";
import Allusers from "../components/Allusers";

const Dashboard = () => {
  const [success, setSuccess] = useState();
  const [currentComponent, setCurrentComponent] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:3001/dashboard")
      .then((res) => {
        if (res.data === "Success") {
          setSuccess("Successed OK");
          const params = new URLSearchParams(location.search);
          const view = params.get("view");
          if (view) {
            setCurrentComponent(view);
          }
        } else {
          navigate("/");
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
      case "AllUsers":
        return <Allusers />;
      default:
        return (
          <div className="h-[90vh] flex items-center justify-center text-6xl px-10 text-center font-bold capitalize">
            Welcome to admin dashboard
          </div>
        );
    }
  };

  return (
    success && (
      <div className="flex px-32 gap-10">
        <div className="w-72 bg-primary text-secondary p-3 h-[90vh] rounded-xl">
          <h1 className="font-bold text-xl">Dashboard</h1>
          <p className="mb-5">Admin</p>
          <nav>
            <ul className="flex flex-col gap-2">
              <li>
                <button
                  onClick={() => handleNavigation("AddDoctor")}
                  className="btn w-full"
                >
                  Add Doctor
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("AllDoctors")}
                  className="btn w-full"
                >
                  All Doctors
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("AllUsers")}
                  className="btn w-full"
                >
                  All Users
                </button>
              </li>
            </ul>
          </nav>
        </div>
        <div className="w-full h-[90vh] overflow-y-auto">
          {renderComponent()}
        </div>
      </div>
    )
  );
};

export default Dashboard;
