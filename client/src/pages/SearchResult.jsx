import React, { useState } from "react";
import { useDoctor } from "../context/DoctorContext";
import DoctorArea from "../data/DoctorArea";
import Location from "../data/Location";
import { useLogin } from "../context/LoginContext";
import { Link } from "react-router-dom";
import axios from "axios";

const SearchResult = () => {
  const { user, isLoggedIn } = useLogin();

  const { doctors, generateTimeSlots } = useDoctor();
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
        window.location.reload();
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
    <div>
      <p>Name: {user && user.name}</p>
      <div>
        {/* Input field with date picker */}
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="form-control"
        />
        {/* Select field for area */}
        <select
          value={selectedArea}
          onChange={(e) => setSelectedArea(e.target.value)}
        >
          <option value="">Select Area</option>

          {DoctorArea.map((docarea, index) => (
            <option key={index} value={docarea}>
              {docarea}
            </option>
          ))}
        </select>
        {/* Select field for division */}
        <select
          value={selectedDivision}
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
        {/* Button to display selected date */}
        <button type="button" onClick={handleButtonClick} className="btn">
          Find Doctor
        </button>
        {/* Display selected date and day */}
        {selectedDay && <p>{selectedDay}</p>}
      </div>
      <div>
        {/* Show filtered doctors */}
        {filteredDoctors.map((doctor) => (
          <div key={doctor._id}>
            <h2>{doctor.name}</h2>
            <p>Specialization: {doctor.area}</p>
            <p>Degree: {doctor.degree}</p>
            <p>Visit: {doctor.visit}</p>
            <p>Division: {doctor.selectedDivision}</p>
            <p>District: {doctor.selectedDistrict}</p>
            {goAppointment && (
              <>
                {isLoggedIn ? (
                  <button
                    className="btn"
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
                  <Link to="/login"> Book an Appointment</Link>
                )}
              </>
            )}
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
                      <li key={index}>
                        {slot.day}: {slot.startTime} - {slot.endTime}
                        <h1>All Slots:</h1>
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
                      </li>
                    ))}
                    <button type="submit" className="btn btn-primary">
                      Confirm
                    </button>
                  </form>
                </ul>
              </div>
            </dialog>
            <img
              src={doctor.imageUrl}
              alt=""
              className="w-32 h-32 object-cover rounded-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResult;
