import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useLogin } from "./LoginContext";

const AppointmentContext = createContext();

export const useAppointment = () => useContext(AppointmentContext);

export const AppointmentProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);
  const [allAppointments, setAllAppointments] = useState([]);
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

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/appointments/all"
      );
      setAllAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/appointments/deleteappointment/${id}`)
      .then((res) => {
        console.log(res);
        setAppointments(
          appointments.filter((appointment) => appointment._id !== id)
        );
        setAllAppointments(
          allAppointments.filter((appointment) => appointment._id !== id)
        );
      })
      .catch((err) => console.log(err));
  };

  const addAppointment = (appointment) => {
    setAppointments([...appointments, appointment]);
  };

  const handleEdit = (id, updatedAppointment) => {
    axios
      .put(
        `http://localhost:3001/appointments/editappointment/${id}`,
        updatedAppointment
      )
      .then((res) => {
        console.log(res);
        setAppointments(
          appointments.map((appointment) =>
            appointment._id === id
              ? { ...appointment, ...updatedAppointment }
              : appointment
          )
        );
        setAllAppointments(
          allAppointments.map((appointment) =>
            appointment._id === id
              ? { ...appointment, ...updatedAppointment }
              : appointment
          )
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        setAppointments,
        handleDelete,
        addAppointment,
        allAppointments,
        setAllAppointments,
        fetchAppointments,
        handleEdit,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};
