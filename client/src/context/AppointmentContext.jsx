import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useLogin } from "./LoginContext";
const AppointmentContext = createContext();

export const useAppointment = () => useContext(AppointmentContext);

export const AppointmentProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);
  const { user } = useLogin();

  useEffect(() => {
    if (user) {
      axios
        .get("http://localhost:3001/appointments/all")
        .then((response) => {
          const userAppointments = response.data.filter(
            (appointment) => appointment.userId === user._id
          );
          setAppointments(userAppointments);
        })
        .catch((error) => {
          console.error("Error fetching appointments:", error);
          setAppointments([]); // Reset appointments on error
        });
    }
  }, [user]);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/appointments/deleteappointment/${id}`)
      .then((res) => {
        console.log(res);
        setAppointments(
          appointments.filter((appointment) => appointment._id !== id)
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <AppointmentContext.Provider
      value={{ appointments, setAppointments, handleDelete }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};
