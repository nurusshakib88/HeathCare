import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
const DoctorContext = createContext();

export const useDoctor = () => useContext(DoctorContext);

export const DoctorProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/doctors/all`)
      .then((response) => setDoctors(response.data))
      .catch((error) => console.error("Error fetching doctors:", error));
  }, [setDoctors]);

  const handleDelete = (id) => {
    axios
      .delete(`/api/doctors/deletedoctor/${id}`)
      .then((res) => {
        console.log(res);
        setDoctors(doctors.filter((doctor) => doctor._id !== id));
      })
      .catch((err) => console.log(err));
  };

  const generateTimeSlots = (startTime, endTime) => {
    const slots = [];
    let currentTime = startTime;
    while (currentTime < endTime) {
      const endTimeSlot = new Date(currentTime);
      endTimeSlot.setMinutes(endTimeSlot.getMinutes() + 20);
      slots.push({
        startTime: currentTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        endTime: endTimeSlot.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });
      currentTime = endTimeSlot;
    }
    return slots;
  };

  return (
    <DoctorContext.Provider
      value={{ doctors, setDoctors, handleDelete, generateTimeSlots }}
    >
      {children}
    </DoctorContext.Provider>
  );
};
