import { useEffect, useState } from "react";
import AmbulanceBanner from "../components/AmbulanceBanner";
import { useLogin } from "../context/LoginContext";
import axios from "axios";
import { Add, Delete, Edit } from "@mui/icons-material";

const Ambulance = () => {
  const [ambulances, setAmbulances] = useState([]);
  const [addingAmbulance, setAddingAmbulance] = useState(false);
  const [editingAmbulance, setEditingAmbulance] = useState(null);
  const [filter, setFilter] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    ambulanceTitle: "",
    ambulanceNumber: "",
    icuService: false,
    contactInfo: "",
    city: "",
  });

  useEffect(() => {
    const fetchAmbulances = async () => {
      try {
        const response = await axios.get(`/api/ambulances`);
        setAmbulances(response.data);
      } catch (error) {
        console.error("Error fetching ambulances:", error);
      }
    };

    fetchAmbulances();
  }, []);

  const handleEditClick = (ambulance) => {
    setEditingAmbulance(ambulance);
    setFormData({
      name: ambulance.name,
      address: ambulance.address,
      ambulanceTitle: ambulance.ambulanceTitle,
      ambulanceNumber: ambulance.ambulanceNumber,
      icuService: ambulance.icuService,
      contactInfo: ambulance.contactInfo,
      city: ambulance.city,
    });
    setAddingAmbulance(true);
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`/api/ambulances/${id}`);
      setAmbulances(ambulances.filter((ambulance) => ambulance._id !== id));
    } catch (error) {
      console.error("Error deleting ambulance:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `/api/ambulances/${editingAmbulance._id}`,
        formData
      );
      setAmbulances(
        ambulances.map((ambulance) =>
          ambulance._id === editingAmbulance._id ? response.data : ambulance
        )
      );
      setEditingAmbulance(null);
      setAddingAmbulance(false);
    } catch (error) {
      console.error("Error updating ambulance:", error);
    }
  };

  const handleAddAmbulanceSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/ambulances`, formData);
      setAmbulances([...ambulances, response.data]);
      setAddingAmbulance(false);
      setFormData({
        name: "",
        address: "",
        ambulanceTitle: "",
        ambulanceNumber: "",
        icuService: false,
        contactInfo: "",
        city: "",
      });
    } catch (error) {
      console.error("Error adding ambulance:", error);
    }
  };

  const handleSearchChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div>
      <AmbulanceBanner
        imageUrl="../../public/photo_2024-05-25_15-44-18.jpg"
        title="Ambulance service"
        subtitle="We are ready for 24/h"
      ></AmbulanceBanner>
      <div className="px-32">
        <div>
          <input
            placeholder="Search"
            value={filter}
            onChange={handleSearchChange}
            className="w-full input input-bordered input-lg rounded-xl my-10"
          />
        </div>
        <div>
          <button
            onClick={() => {
              setAddingAmbulance(true);
              setEditingAmbulance(null);
            }}
            className="btn btn-primary my-4 text-secondary"
          >
            <Add />
            Add Ambulance
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="table w-full table-lg table-zebra">
            <thead className="bg-primary text-secondary">
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Ambulance Title</th>
                <th>Ambulance Number</th>
                <th>ICU Service</th>
                <th>Contact Info</th>
                <th>City</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {ambulances
                .filter(
                  (ambulance) =>
                    ambulance.name
                      .toLowerCase()
                      .includes(filter.toLowerCase()) ||
                    ambulance.address
                      .toLowerCase()
                      .includes(filter.toLowerCase()) ||
                    ambulance.ambulanceTitle
                      .toLowerCase()
                      .includes(filter.toLowerCase()) ||
                    ambulance.ambulanceNumber
                      .toLowerCase()
                      .includes(filter.toLowerCase()) ||
                    ambulance.contactInfo
                      .toLowerCase()
                      .includes(filter.toLowerCase()) ||
                    ambulance.city.toLowerCase().includes(filter.toLowerCase())
                )
                .map((ambulance) => (
                  <tr key={ambulance._id}>
                    <td>{ambulance.name}</td>
                    <td>{ambulance.address}</td>
                    <td>{ambulance.ambulanceTitle}</td>
                    <td>{ambulance.ambulanceNumber}</td>
                    <td>{ambulance.icuService ? "Yes" : "No"}</td>
                    <td>{ambulance.contactInfo}</td>
                    <td>{ambulance.city}</td>
                    <td className="flex">
                      <button
                        className="btn btn-primary btn-circle"
                        onClick={() => handleEditClick(ambulance)}
                      >
                        <Edit />
                      </button>
                      <button
                        className="btn btn-error ml-2 btn-circle"
                        onClick={() => handleDeleteClick(ambulance._id)}
                      >
                        <Delete />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {addingAmbulance && (
          <div className="modal modal-open">
            <div className="modal-box">
              <h2 className="font-bold text-lg">
                {editingAmbulance ? "Edit Ambulance" : "Add New Ambulance"}
              </h2>
              <form
                className="flex flex-col gap-3 p-3"
                onSubmit={
                  editingAmbulance
                    ? handleUpdateSubmit
                    : handleAddAmbulanceSubmit
                }
              >
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input input-bordered w-full mb-2"
                />
                <input
                  type="text"
                  placeholder="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="input input-bordered w-full mb-2"
                />
                <input
                  type="text"
                  placeholder="Ambulance Title"
                  name="ambulanceTitle"
                  value={formData.ambulanceTitle}
                  onChange={handleChange}
                  className="input input-bordered w-full mb-2"
                />
                <input
                  type="text"
                  placeholder="Ambulance Number"
                  name="ambulanceNumber"
                  value={formData.ambulanceNumber}
                  onChange={handleChange}
                  className="input input-bordered w-full mb-2"
                />
                <select
                  name="icuService"
                  value={formData.icuService}
                  onChange={handleChange}
                  className="select select-bordered w-full mb-2"
                >
                  <option value={false}>No ICU Service</option>
                  <option value={true}>ICU Service</option>
                </select>
                <input
                  type="text"
                  placeholder="Contact Info"
                  name="contactInfo"
                  value={formData.contactInfo}
                  onChange={handleChange}
                  className="input input-bordered w-full mb-2"
                />
                <input
                  type="text"
                  placeholder="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="input input-bordered w-full mb-2"
                />
                <div className="flex justify-end">
                  <button type="submit" className="btn btn-primary mb-2">
                    {editingAmbulance ? "Update Ambulance" : "Add Ambulance"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-error mb-2 ml-2"
                    onClick={() => {
                      setAddingAmbulance(false);
                      setFormData({
                        name: "",
                        address: "",
                        ambulanceTitle: "",
                        ambulanceNumber: "",
                        icuService: false,
                        contactInfo: "",
                        city: "",
                      });
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ambulance;
