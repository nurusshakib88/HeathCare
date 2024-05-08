import React, { useState } from "react";
import axios from "axios";
import Location from "../data/Location";
import DoctorArea from "../data/DoctorArea";
import { WeekDays, Times } from "../data/DateTime";

const AddDoctor = () => {
  const [name, setName] = useState("");
  const [area, setArea] = useState("");
  const [visit, setVisit] = useState("");
  const [degree, setDegree] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);
  const [availability, setAvailability] = useState([]);

  const handleDivisionChange = (e) => {
    setSelectedDivision(e.target.value);
    setSelectedDistrict("");
    console.log("Selected Division:", e.target.value);
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
    console.log("Selected District:", e.target.value);
  };

  const addAvailabilitySlot = () => {
    setAvailability([...availability, { day: "", startTime: "", endTime: "" }]);
  };

  const removeAvailabilitySlot = (index) => {
    const updatedAvailability = [...availability];
    updatedAvailability.splice(index, 1);
    setAvailability(updatedAvailability);
  };

  const handleAvailabilityChange = (index, field, value) => {
    const updatedAvailability = [...availability];
    updatedAvailability[index][field] = value;
    setAvailability(updatedAvailability);
  };

  const Submit = async (e) => {
    e.preventDefault();
    if (!imageUrl) {
      console.log("Please upload image first");
      return;
    }
    setSignupLoading(true);
    const formData = {
      name,
      area,
      visit,
      degree,
      selectedDivision,
      selectedDistrict,
      imageUrl,
      availability,
    };
    try {
      await axios.post(`http://localhost:3001/doctors/add`, formData);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
    setSignupLoading(false);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setImage(file);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "hospitalcloud");
    data.append("cloud_name", "djtvum4xg");

    try {
      setLoading(true);
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/djtvum4xg/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      setLoading(false);

      const cloudData = await res.json();
      setImageUrl(cloudData.url);
      console.log("Image Upload Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={Submit}>
        <input
          type="text"
          placeholder="Doctor Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div>
          <label htmlFor="area">Select Area:</label>
          <select
            id="area"
            value={area}
            onChange={(e) => setArea(e.target.value)}
          >
            <option value="">Select Area</option>
            {DoctorArea.map((docarea, index) => (
              <option key={index} value={docarea}>
                {docarea}
              </option>
            ))}
          </select>
        </div>

        <input
          type="text"
          placeholder="Doctor visit"
          value={visit}
          onChange={(e) => setVisit(e.target.value)}
        />
        <input
          type="text"
          placeholder="Doctor degree"
          value={degree}
          onChange={(e) => setDegree(e.target.value)}
        />
        <div>
          <label htmlFor="division">Select Division:</label>
          <select
            id="division"
            value={selectedDivision}
            onChange={handleDivisionChange}
          >
            <option value="">Select Division</option>
            {Location.map((location, index) => (
              <option key={index} value={location.division}>
                {location.division}
              </option>
            ))}
          </select>

          <label htmlFor="district">Select District:</label>
          <select
            id="district"
            value={selectedDistrict}
            onChange={handleDistrictChange}
            disabled={!selectedDivision}
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

        {/* Add inputs for doctor availability */}
        {availability.map((slot, index) => (
          <div key={index}>
            {/* <input
              type="text"
              placeholder="Day (e.g., Monday)"
              value={slot.day}
              onChange={(e) =>
                handleAvailabilityChange(index, "day", e.target.value)
              }
            /> */}

            <select
              id="availability"
              value={slot.day}
              onChange={(e) =>
                handleAvailabilityChange(index, "day", e.target.value)
              }
            >
              <option value="">Select Day</option>
              {WeekDays.map((weekday, index) => (
                <option key={index} value={weekday}>
                  {weekday}
                </option>
              ))}
            </select>

  

            <select
              id="starttime"
              value={slot.startTime}
              onChange={(e) =>
                handleAvailabilityChange(index, "startTime", e.target.value)
              }
            >
              <option value="">Start Time</option>
              {Times.map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
            </select>

            <select
              id="endtime"
              value={slot.endTime}
              onChange={(e) =>
                handleAvailabilityChange(index, "endTime", e.target.value)
              }
            >
              <option value="">End Time</option>
              {Times.map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
            </select>

            <button type="button" onClick={() => removeAvailabilitySlot(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addAvailabilitySlot}>
          Add Availability Slot
        </button>

        {/* availability */}

        {/* image  */}
        <label htmlFor="file-upload" className="cursor-pointer inline-block ">
          {image ? (
            <img
              className=" w-72 lg:w-96  rounded-xl"
              src={image ? URL.createObjectURL(image) : ""}
              alt="img"
            />
          ) : (
            "Select Image"
          )}
        </label>
        <input
          id="file-upload"
          className="hidden text-white"
          type="file"
          onChange={handleImageChange}
        />
        <p>{imageUrl}</p>
        {loading ? (
          <button type="button" className="btn btn-primary" disabled>
            Uploading image ...
          </button>
        ) : (
          <button
            className="btn btn-primary"
            disabled={!imageUrl || signupLoading}
          >
            {signupLoading ? "Uploading..." : "Upload"}
          </button>
        )}
      </form>
    </div>
  );
};

export default AddDoctor;
