import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Location from "../data/Location";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CloudUpload } from "@mui/icons-material";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [blood, setBlood] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);

  const handleDivisionChange = (e) => {
    setSelectedDivision(e.target.value);
    setSelectedDistrict("");
    console.log("Selected Division:", e.target.value);
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
    console.log("Selected District:", e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageUrl) {
      console.log("Please upload image first");
      return;
    }
    setSignupLoading(true);
    const formData = {
      name,
      email,
      phone,
      age,
      sex,
      blood,
      selectedDivision,
      selectedDistrict,
      imageUrl,
      password,
    };
    try {
      await axios.post(`/api/register`, formData);
      navigate("/login");
    } catch (error) {
      console.log(error);
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
    <div className="px-32 py-10 flex items-center justify-center text-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col px-5 py-8 w-[60%] rounded-xl gap-3"
        style={{ boxShadow: "0 1px 10px rgb(0,0,0,.3)" }}
      >
        <h1 className="font-bold mb-5 text-xl">Register</h1>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered col-span-2"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered"
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="input input-bordered"
          />
          <input
            type="date"
            placeholder="Date of Birth"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="input input-bordered col-span-2"
          />

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Select Division</span>
            </div>
            <select
              id="division"
              value={selectedDivision}
              onChange={handleDivisionChange}
              className="select w-full select-bordered"
            >
              <option value="">Select Division</option>
              {Location.map((location, index) => (
                <option key={index} value={location.division}>
                  {location.division}
                </option>
              ))}
            </select>
          </label>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Select District</span>
            </div>
            <select
              id="district"
              value={selectedDistrict}
              onChange={handleDistrictChange}
              disabled={!selectedDivision}
              className="select w-full  select-bordered"
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
          </label>

          <select
            value={sex}
            onChange={(e) => setSex(e.target.value)}
            className="select w-full select-bordered"
          >
            <option value="" disabled>
              Select Sex
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <select
            value={blood}
            onChange={(e) => setBlood(e.target.value)}
            className="select w-full select-bordered"
          >
            <option value="" disabled>
              Blood Group
            </option>
            <option value="O -">O -</option>
            <option value="O +">O +</option>
            <option value="A -">A -</option>
            <option value="A -+">A +</option>
            <option value="B -">B -</option>
            <option value="B -">B +</option>
            <option value="AB -">AB -</option>
            <option value="AB -">AB +</option>
          </select>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered col-span-2"
          />
        </div>

        <label
          htmlFor="file-upload"
          className="cursor-pointer inline-block border-2 border-dashed border-gray-400 p-8 text-center rounded-lg"
        >
          {image ? (
            <img
              className="w-16 h-16 rounded-full object-cover mx-auto"
              src={URL.createObjectURL(image)}
              alt="Profile"
            />
          ) : (
            <>
              <CloudUpload />
              <br></br>
              Upload Profile Picture
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
          <button
            type="button"
            disabled
            className="btn btn-primary text-secondary"
          >
            Uploading image ...
          </button>
        ) : (
          <button
            type="submit"
            disabled={!imageUrl || signupLoading}
            className="btn btn-primary text-secondary"
          >
            {signupLoading ? "Signing up..." : "Sign Up"}
          </button>
        )}
        <p>
          Already have an account?{" "}
          <Link to="/login" className="underline text-primary">
            Login
          </Link>{" "}
          Instead
        </p>
      </form>
    </div>
  );
};

export default Signup;
