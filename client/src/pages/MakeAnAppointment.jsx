import React, { useState } from "react";
import { useDoctor } from "../context/DoctorContext";
import DoctorArea from "../data/DoctorArea";
import Location from "../data/Location";
import { useLogin } from "../context/LoginContext";
import { useAppointment } from "../context/AppointmentContext"; // Import the useAppointment hook
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const MakeAnAppointment = () => {
  const { user, isLoggedIn } = useLogin();
  const { doctors, generateTimeSlots } = useDoctor();
  const { addAppointment } = useAppointment(); // Use the addAppointment function from context

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [selectedSlotStartTime, setSelectedSlotStartTime] = useState("");
  const [selectedSlotEndTime, setSelectedSlotEndTime] = useState("");
  const [goAppointment, setGoAppointment] = useState(false);
  const navigate = useNavigate();

  const handleSlotSelection = (startTime, endTime) => {
    setSelectedSlotStartTime(startTime);
    setSelectedSlotEndTime(endTime);
  };

  // Function to handle date picker change
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    // Reset selected day when a new date is picked
    setSelectedDay(null);
  };

  // Function to handle button click
  const handleButtonClick = () => {
    setGoAppointment(false);
    if (selectedDate) {
      const day = new Date(selectedDate).toLocaleDateString("en-US", {
        weekday: "long",
      });
      setSelectedDay(day);
      setGoAppointment(true);
    } else {
      alert("Please select a date.");
      setGoAppointment(false);
    }
  };

  // Filter doctors based on selected day, area, division, and district
  const filteredDoctors = doctors.filter((doctor) => {
    const matchesDate = selectedDay
      ? doctor.availability.some((slot) => slot.day === selectedDay)
      : true;
    const matchesArea = selectedArea ? doctor.area === selectedArea : true;
    const matchesDivision = selectedDivision
      ? doctor.selectedDivision === selectedDivision
      : true;
    const matchesDistrict = selectedDistrict
      ? doctor.selectedDistrict === selectedDistrict
      : true;
    return matchesDate && matchesArea && matchesDivision && matchesDistrict;
  });

  const AppointmentSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`http://localhost:3001/appointments/add`, {
        userId,
        userName,
        doctorName,
        slotStartTime: selectedSlotStartTime,
        slotEndTime: selectedSlotEndTime,
        selectedDay,
        selectedDate,
      })
      .then((result) => {
        console.log(result);
        addAppointment(result.data); // Update the state with the new appointment
        navigate("/appointments");
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          // Appointment already exists, display an error message
          alert("Appointment already exists for this slot.");
        } else {
          console.error(err);
        }
      });
  };

  return (
    <div className="px-32">
      <div className="bg-primary p-10 rounded-xl my-10">
        <div className="flex gap-3 items-center justify-center">
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="form-control input"
          />
          <select
            value={selectedArea}
            className="input"
            onChange={(e) => setSelectedArea(e.target.value)}
          >
            <option value="">Select Area</option>

            {DoctorArea.map((docarea, index) => (
              <option key={index} value={docarea}>
                {docarea}
              </option>
            ))}
          </select>
          <select
            value={selectedDivision}
            className="input"
            onChange={(e) => setSelectedDivision(e.target.value)}
          >
            <option value="">Select Division</option>
            {Location.map((location, index) => (
              <option key={index} value={location.division}>
                {location.division}
              </option>
            ))}
          </select>
          <select
            value={selectedDistrict}
            className="input"
            onChange={(e) => setSelectedDistrict(e.target.value)}
          >
            <option value="">Select District</option>
            {Location.find(
              (location) => location.division === selectedDivision
            )?.districts.map((district, index) => (
              <option key={index} value={district}>
                {district}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={handleButtonClick}
            className="btn btn-success text-secondary"
          >
            Find Doctor
          </button>
        </div>
      </div>

      <div>
        {/* Show filtered doctors */}
        {filteredDoctors.map((doctor) => (
          <div key={doctor._id}>
            <div
              className="flex items-center gap-5 p-3 rounded-xl mb-5"
              style={{ boxShadow: "0 1px 10px rgb(0,0,0,.3)" }}
            >
              <img
                src={doctor.imageUrl}
                alt=""
                className="w-32 h-32 object-cover rounded-full"
              />
              <div>
                <h2>
                  Name: {doctor.name} - {doctor.degree}
                </h2>
                <p>Specialization: {doctor.area}</p>
                <p>Visit: {doctor.visit}</p>
                <p>
                  Location: {doctor.selectedDistrict}, {doctor.selectedDivision}
                </p>
              </div>
              {goAppointment && (
                <>
                  {isLoggedIn ? (
                    <button
                      className="btn btn-success text-secondary ms-auto"
                      onClick={() => {
                        document.getElementById("my_modal_3").showModal();
                        setDoctorName(doctor.name);
                        setUserName(user.name);
                        setUserId(user._id);
                      }}
                    >
                      Book an Appointment
                    </button>
                  ) : (
                    <Link
                      to="/login"
                      className="btn btn-success text-secondary ms-auto"
                    >
                      {" "}
                      Book an Appointment
                    </Link>
                  )}
                </>
              )}
            </div>
            <dialog id="my_modal_3" className="modal">
              <div className="modal-box">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                </form>
                <ul>
                  <form onSubmit={AppointmentSubmit}>
                    {doctor.availability.map((slot, index) => (
                      <li key={index} className="mb-4">
                        <h3 className="mb-2">
                          {" "}
                          <strong>{slot.day}:</strong> {slot.startTime} -{" "}
                          {slot.endTime}
                        </h3>
                        <h1 className="font-bold mb-2">Avialable Slots:</h1>
                        <div className="flex flex-wrap gap-2">
                          {generateTimeSlots(
                            new Date(`01/01/2000 ${slot.startTime}`),
                            new Date(`01/01/2000 ${slot.endTime}`)
                          ).map((timeSlot, idx) => (
                            <label key={idx} className="btn bg-neutral-content">
                              <input
                                type="radio"
                                name={`slot_${index}`} // Assigning unique names based on index
                                value={`${timeSlot.startTime} - ${timeSlot.endTime}`}
                                onChange={() =>
                                  handleSlotSelection(
                                    timeSlot.startTime,
                                    timeSlot.endTime
                                  )
                                }
                              />
                              {timeSlot.startTime} - {timeSlot.endTime}
                            </label>
                          ))}
                        </div>
                      </li>
                    ))}
                    <div className="w-full text-center">
                      <button
                        type="submit"
                        className="btn btn-wide btn-primary"
                      >
                        Confirm
                      </button>
                    </div>
                  </form>
                </ul>
              </div>
            </dialog>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MakeAnAppointment;
