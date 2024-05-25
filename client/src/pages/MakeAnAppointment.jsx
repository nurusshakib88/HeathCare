import React, { useState, useEffect } from "react";
import { useDoctor } from "../context/DoctorContext";
import DoctorArea from "../data/DoctorArea";
import Location from "../data/Location";
import { useLogin } from "../context/LoginContext";
import { useAppointment } from "../context/AppointmentContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const MakeAnAppointment = () => {
  const { user, isLoggedIn } = useLogin();
  const { doctors, generateTimeSlots } = useDoctor();
  const { addAppointment } = useAppointment();
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

  useEffect(() => {
    // When the date changes, automatically trigger the search for doctors
    if (selectedDate) {
      handleDateChange(selectedDate);
    }
  }, [selectedDate]);

  const handleSlotSelection = (startTime, endTime) => {
    setSelectedSlotStartTime(startTime);
    setSelectedSlotEndTime(endTime);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const day = new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
    });
    setSelectedDay(day);
    setGoAppointment(true);
  };

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
      .post(`/api/appointments/add`, {
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
        addAppointment(result.data);
        navigate("/appointments");
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          alert("Appointment already exists for this slot.");
        } else {
          console.error(err);
        }
      });
  };

  return (
    <div className="px-32 min-h-[82vh]">
      <div className="bg-primary p-10 rounded-xl my-10">
        <div className="flex gap-3 items-center justify-center">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => handleDateChange(e.target.value)}
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
            onChange={(e) => {
              setSelectedDivision(e.target.value);
              setSelectedDistrict(""); // Reset district when division changes
            }}
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
            disabled={!selectedDivision} // Disable if no division selected
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
        </div>
      </div>

      <div>
        {selectedDate ? (
          filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
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
                      Location: {doctor.selectedDistrict},{" "}
                      {doctor.selectedDivision}
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
                      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                      </button>
                    </form>
                    <ul>
                      <form onSubmit={AppointmentSubmit}>
                        {doctor.availability.map((slot, index) => (
                          <li key={index} className="mb-4">
                            <h3 className="mb-2">
                              <strong>{slot.day}:</strong> {slot.startTime} -
                              {slot.endTime}
                            </h3>
                            <h1 className="font-bold mb-2">Available Slots:</h1>
                            <div className="grid grid-cols-2 gap-2">
                              {generateTimeSlots(
                                new Date(`01/01/2000 ${slot.startTime}`),
                                new Date(`01/01/2000 ${slot.endTime}`)
                              ).map((timeSlot, idx) => (
                                <label
                                  key={idx}
                                  className="btn bg-neutral-content"
                                >
                                  <input
                                    type="radio"
                                    name={`slot_${index}`}
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
            ))
          ) : (
            <p className="text-red-500 text-center">
              No doctors available with the selected criteria.
            </p>
          )
        ) : (
          <p className="text-red-500 text-center">
            Please select a date to book an appointment.
          </p>
        )}
      </div>
    </div>
  );
};

export default MakeAnAppointment;
