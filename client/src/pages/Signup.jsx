import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Location from "../data/Location";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
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
      sex,
      age,
      selectedDivision,
      selectedDistrict,
      imageUrl,
      password,
    };
    try {
      await axios.post("http://localhost:3001/register", formData);
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
    <form onSubmit={handleSubmit} className="flex flex-col">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <input
        type="date"
        placeholder="Date of Birth"
        value={age}
        onChange={(e) => setAge(e.target.value)}
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
      <label htmlFor="file-upload" className="cursor-pointer inline-block ">
        {image ? (
          <img
            className=" w-72 lg:w-96  rounded-xl"
            src={image ? URL.createObjectURL(image) : ""}
            alt="img"
          />
        ) : (
          "upload"
        )}
      </label>
      <input
        id="file-upload"
        className="hidden text-white"
        type="file"
        onChange={handleImageChange}
      />
      <p>{imageUrl}</p>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {loading ? (
        <button type="button" className="btn btn-primary" disabled>
          Uploading image ...
        </button>
      ) : (
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!imageUrl || signupLoading}
        >
          {signupLoading ? "Signing up..." : "Sign Up"}
        </button>
      )}
      <Link to="/login" className="btn">
        Login
      </Link>{" "}
      Instead
    </form>
  );
};

export default Signup;
