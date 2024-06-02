import { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import { useLogin } from "../context/LoginContext";
import { Delete, Edit } from "@mui/icons-material";

const BloodDonorList = () => {
  const [donors, setDonors] = useState([]);
  const [addingDonor, setAddingDonor] = useState(false);
  const { user } = useLogin();
  const [editingDonor, setEditingDonor] = useState(null);
  const [filter, setFilter] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    bloodGroup: "",
    contactInfo: "",
  });

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const response = await axios.get("/api/donors");
        setDonors(response.data);
      } catch (error) {
        console.error("Error fetching donors:", error);
      }
    };

    fetchDonors();
  }, []);

  const handleEditClick = (donor) => {
    setEditingDonor(donor);
    setFormData({
      name: donor.name,
      address: donor.address,
      bloodGroup: donor.bloodGroup,
      contactInfo: donor.contactInfo,
    });
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`/api/donors/${id}`);
      setDonors(donors.filter((donor) => donor._id !== id));
    } catch (error) {
      console.error("Error deleting donor:", error);
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
        `/api/donors/${editingDonor._id}`,
        formData
      );
      setDonors(
        donors.map((donor) =>
          donor._id === editingDonor._id ? response.data : donor
        )
      );
      setEditingDonor(null);
    } catch (error) {
      console.error("Error updating donor:", error);
    }
  };

  const handleAddDonorSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/donors/add`, formData);
      setDonors([...donors, response.data]);
      setAddingDonor(false);
      setFormData({ name: "", address: "", bloodGroup: "", contactInfo: "" });
    } catch (error) {
      console.error("Error adding donor:", error);
    }
  };
  const filteredDonors = donors.filter(
    (donor) =>
      donor.name.toLowerCase().includes(filter.toLowerCase()) ||
      donor.address.toLowerCase().includes(filter.toLowerCase()) ||
      donor.bloodGroup.toLowerCase().includes(filter.toLowerCase()) ||
      donor.contactInfo.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="px-8">
      <h1 className="text-2xl font-bold mb-4">Blood Donors</h1>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6}>
          <input
            placeholder="Filter Donors"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="input input-bordered w-full input-lg rounded-2xl mb-10"
          />
        </Grid>
      </Grid>
      <div className="overflow-x-auto">
        <table className="table w-full table-lg table-zebra rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-primary text-secondary">
              <th>Name</th>
              <th>Address</th>
              <th>Blood Group</th>
              <th>Contact Info</th>
              {user?.role === "admin" && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filteredDonors.length > 0 ? (
              filteredDonors.map((donor) => (
                <tr key={donor._id}>
                  <td className="border">{donor.name}</td>
                  <td className="border">{donor.address}</td>
                  <td className="border">{donor.bloodGroup}</td>
                  <td className="border">{donor.contactInfo}</td>
                  {user?.role === "admin" && (
                    <td className="border">
                      <button
                        onClick={() => handleEditClick(donor)}
                        className="btn btn-circle btn-primary text-secondary me-3"
                      >
                        <Edit />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(donor._id)}
                        className="btn btn-circle btn-error text-secondary"
                      >
                        <Delete />
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td className="border" colSpan={5}>
                  No donors available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div>
        <button
          onClick={() => setAddingDonor(true)}
          className="my-4 btn btn-primary text-secondary"
        >
          Become a Donor
        </button>
      </div>

      {addingDonor && (
        <div className="inmodal z-50">
          <div className="inmodal-box">
            <h2 className="text-xl font-bold">Became A Donor</h2>
            <form onSubmit={handleAddDonorSubmit}>
              <div className="mb-2">
                <label className="block">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="mb-2">
                <label className="block">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="mb-2">
                <label className="block">Blood Group</label>
                <input
                  type="text"
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="mb-2">
                <label className="block">Contact Info</label>
                <input
                  type="text"
                  name="contactInfo"
                  value={formData.contactInfo}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </div>

              <button
                type="submit"
                className="mt-2 px-4 py-2 btn btn-primary text-white rounded-xl me-3"
              >
                Add Donor
              </button>
              <button
                onClick={() => setAddingDonor(false)}
                className="mt-2 px-4 py-2 btn btn-error text-white rounded-xl"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {editingDonor && (
        <div className="inmodal">
          <div className="inmodal-box">
            <h2 className="text-xl font-bold">Edit Inventory</h2>
            <form onSubmit={handleUpdateSubmit}>
              <div className="mb-2">
                <label className="block">Name</label>
                <input
                  type="text"
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="mb-2">
                <label className="block">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="mb-2">
                <label className="block">Blood Group</label>
                <input
                  type="text"
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="mb-2">
                <label className="block">Contact Info</label>
                <input
                  type="text"
                  name="contactInfo"
                  value={formData.contactInfo}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </div>

              <button
                type="submit"
                className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
              >
                Update
              </button>
              <button
                onClick={() => setEditingDonor(null)}
                className="ml-2 px-4 py-2 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BloodDonorList;
