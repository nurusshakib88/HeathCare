import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddDoctor from "../components/AddDoctor";
import AllDoctors from "../components/AllDoctors";
import Allusers from "../components/Allusers";

const Dashboard = () => {
  const [success, setSuccess] = useState();
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:3001/dashboard")
      .then((res) => {
        if (res.data === "Success") {
          setSuccess("Successed OK");
        } else {
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      Dashboard
      {success}
      <AddDoctor />
      <AllDoctors />
      <Allusers />
    </div>
  );
};

export default Dashboard;
