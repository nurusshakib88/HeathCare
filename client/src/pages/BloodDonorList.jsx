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

const BloodDonorList = () => {
  const [donors, setDonors] = useState([]);
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
        const response = await axios.get("http://localhost:3001/donors");
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
      await axios.delete(`http://localhost:3001/donors/${id}`);
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
        `http://localhost:3001/donors/${editingDonor._id}`,
        formData,
      );
      setDonors(
        donors.map((donor) =>
          donor._id === editingDonor._id ? response.data : donor,
        ),
      );
      setEditingDonor(null);
    } catch (error) {
      console.error("Error updating donor:", error);
    }
  };

  const filteredDonors = donors.filter(
    (donor) =>
      donor.name.toLowerCase().includes(filter.toLowerCase()) ||
      donor.address.toLowerCase().includes(filter.toLowerCase()) ||
      donor.bloodGroup.toLowerCase().includes(filter.toLowerCase()) ||
      donor.contactInfo.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    // <div>
    //     <h1 className="text-2xl font-bold mb-4">Donors</h1>
    //     <ul className="list-disc pl-5">
    //         {donors.length > 0 ? (
    //             donors.map(donor => (
    //                 <li key={donor._id} className="mb-2">
    //                     <strong>Name:</strong> {donor.name},
    //                     <strong> Address:</strong> {donor.address},
    //                     <strong> Blood Group:</strong> {donor.bloodGroup},
    //                     <strong> Contact Info:</strong> {donor.contactInfo}
    //                     <button onClick={() => handleEditClick(donor)} className="ml-2 px-2 py-1 bg-blue-500 text-white rounded">Edit</button>
    //                     <button onClick={() => handleDeleteClick(donor._id)} className="ml-2 px-2 py-1 bg-red-500 text-white rounded">Delete</button>
    //                 </li>
    //             ))
    //         ) : (
    //             <p>No donors available</p>
    //         )}
    //     </ul>

    //     {editingDonor && (
    //         <div className="inmodal">
    //             <div className="inmodal-box">
    //                 <h2 className="text-xl font-bold">Edit Donor</h2>
    //                 <form onSubmit={handleUpdateSubmit}>
    //                     <div className="mb-2">
    //                         <label className="block">Name</label>
    //                         <input type="text" name="name" value={formData.name} onChange={handleChange} className="input input-bordered w-full"/>
    //                     </div>
    //                     <div className="mb-2">
    //                         <label className="block">Address</label>
    //                         <input type="text" name="address" value={formData.address} onChange={handleChange} className="input input-bordered w-full"/>
    //                     </div>
    //                     <div className="mb-2">
    //                         <label className="block">Blood Group</label>
    //                         <input type="text" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className="input input-bordered w-full"/>
    //                     </div>
    //                     <div className="mb-2">
    //                         <label className="block">Contact Info</label>
    //                         <input type="text" name="contactInfo" value={formData.contactInfo} onChange={handleChange} className="input input-bordered w-full"/>
    //                     </div>
    //                     <button type="submit" className="mt-2 px-4 py-2 bg-green-500 text-white rounded">Update</button>
    //                     <button onClick={() => setEditingDonor(null)} className="ml-2 px-4 py-2 bg-gray-500 text-white rounded">Cancel</button>
    //                 </form>
    //             </div>
    //         </div>
    //     )}
    // </div>
    <div className="px-32">
      <h1 className="text-2xl font-bold mb-4">Donors</h1>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Filter Donors"
            variant="outlined"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </Grid>
      </Grid>
      <TableContainer component={Paper} className="my-4">
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Blood Group</TableCell>
              <TableCell>Contact Info</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredDonors.length > 0 ? (
              filteredDonors.map((donor) => (
                <TableRow key={donor._id}>
                  <TableCell>{donor.name}</TableCell>
                  <TableCell>{donor.address}</TableCell>
                  <TableCell>{donor.bloodGroup}</TableCell>
                  <TableCell>{donor.contactInfo}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEditClick(donor)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDeleteClick(donor._id)}
                      className="ml-2"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}>No donors available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
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

      {/* {editingDonor && (
            <div className="inmodal">
                <div className="inmodal-box">
                    <h2 className="text-xl font-bold">Edit Donor</h2>
                    <form onSubmit={handleUpdateSubmit}>
                        <div className="mb-2">
                            <label className="block">Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} className="input input-bordered w-full" />
                        </div>
                        <div className="mb-2">
                            <label className="block">Address</label>
                            <input type="text" name="address" value={formData.address} onChange={handleChange} className="input input-bordered w-full" />
                        </div>
                        <div className="mb-2">
                            <label className="block">Blood Group</label>
                            <input type="text" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className="input input-bordered w-full" />
                        </div>
                        <div className="mb-2">
                            <label className="block">Contact Info</label>
                            <input type="text" name="contactInfo" value={formData.contactInfo} onChange={handleChange} className="input input-bordered w-full" />
                        </div>
                        <Button type="submit" variant="contained" color="primary" className="mt-2">Update</Button>
                        <Button onClick={() => setEditingDonor(null)} variant="contained" color="default" className="mt-2 ml-2">Cancel</Button>
                    </form>
                </div>
            </div>
        )} */}
    </div>
  );
};

export default BloodDonorList;
