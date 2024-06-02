import React, { useState } from "react";
import axios from "axios";
import Location from "../data/Location";
import DoctorArea from "../data/DoctorArea";
import { WeekDays, Times } from "../data/DateTime";
import { CloudUpload } from "@mui/icons-material";

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
      axios.post(`/api/doctors/add`, formData);
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
    data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
    data.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

    try {
      setLoading(true);
      const res = await fetch(import.meta.env.VITE_CLOUDINARY_URL, {
        method: "POST",
        body: data,
      });
      setLoading(false);

      const cloudData = await res.json();
      setImageUrl(cloudData.url);
      console.log("Image Upload Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full py-10 overflow-hidden flex justify-center flex-col items-center">
      <form
        onSubmit={Submit}
        className="flex flex-col gap-3 shadow p-10 rounded-xl"
        style={{ boxShadow: "0 1px 10px rgb(0,0,0,.3)" }}
      >
        <h1 className="text-2xl font-bold text-center mb-10">Add Doctor</h1>
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Doctor Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input input-bordered"
          />{" "}
          <input
            type="text"
            placeholder="Doctor degree"
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
            required
            className="input input-bordered"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-3">
            <label htmlFor="area" className="w-full">
              Select Area:
            </label>
            <select
              id="area"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              required
              className="input input-bordered"
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
            required
            className="input input-bordered"
          />
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-3 items-center w-full">
            <label htmlFor="division" className="w-full">
              Select Division:
            </label>
            <select
              id="division"
              value={selectedDivision}
              onChange={handleDivisionChange}
              required
              className="input input-bordered w-full"
            >
              <option value="">Select Division</option>
              {Location.map((location, index) => (
                <option key={index} value={location.division}>
                  {location.division}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 items-center w-full">
            {" "}
            <label htmlFor="district" className="w-full">
              Select District:
            </label>
            <select
              id="district"
              value={selectedDistrict}
              onChange={handleDistrictChange}
              disabled={!selectedDivision}
              required
              className="input input-bordered w-full"
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
        {/* Add inputs for doctor availability */}
        {availability.map((slot, index) => (
          <div key={index} className="grid grid-cols-4 gap-3">
            <select
              id="availability"
              value={slot.day}
              required
              onChange={(e) =>
                handleAvailabilityChange(index, "day", e.target.value)
              }
              className="input input-bordered"
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
              required
              className="input input-bordered"
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
              required
              className="input input-bordered"
            >
              <option value="">End Time</option>
              {Times.map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => removeAvailabilitySlot(index)}
              className="btn text-secondary btn-error"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addAvailabilitySlot}
          className="btn btn-success text-secondary"
        >
          Add Availability Slot
        </button>
        {/* availability */}
        {/* image  */}
        <label
          htmlFor="file-upload"
          className="input input-bordered border-dashed border-2 flex flex-col items-center
          gap-2 h-max p-8 cursor-pointer"
          style={{ borderSpacing: "10px" }}
        >
          {image ? (
            <img
              className="w-20 h-20 rounded-full object-cover mx-auto"
              src={URL.createObjectURL(image)}
              alt="Selected"
            />
          ) : (
            <>
              <CloudUpload />
              Select Doctor Image
            </>
          )}
        </label>
        <input
          id="file-upload"
          className="hidden"
          type="file"
          onChange={handleImageChange}
        />
        {loading ? (
          <button type="button" className="btn btn-primary" disabled>
            Uploading image ...
          </button>
        ) : (
          <button
            className="btn btn-primary text-secondary"
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
