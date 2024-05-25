import { useEffect, useState } from 'react';
import AmbulanceBanner from '../components/AmbulanceBanner';
import { useLogin } from '../context/LoginContext';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

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
        const response = await axios.get("http://localhost:3001/ambulances");
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
      await axios.delete(`http://localhost:3001/ambulances/${id}`);
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
        `http://localhost:3001/ambulances/${editingAmbulance._id}`,
        formData,
      );
      setAmbulances(
        ambulances.map((ambulance) =>
          ambulance._id === editingAmbulance._id ? response.data : ambulance,
        ),
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
      const response = await axios.post(
        "http://localhost:3001/ambulances",
        formData,
      );
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
      <div>
        <TextField
          fullWidth
          label="Search"
          variant="outlined"
          value={filter}
          onChange={handleSearchChange}
        />
      </div>
      <div>
        <Button
          onClick={() => {
            setAddingAmbulance(true);
            setEditingAmbulance(null);
          }}
          variant="contained"
          color="primary"
          className="my-4"
        >
          Add Info
        </Button>
      </div>
      <TableContainer component={Paper} className="my-4">
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Ambulance Title</TableCell>
              <TableCell>Ambulance Number</TableCell>
              <TableCell>ICU Service</TableCell>
              <TableCell>Contact Info</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ambulances
              .filter(
                (ambulance) =>
                  ambulance.name.toLowerCase().includes(filter.toLowerCase()) ||
                  ambulance.address.toLowerCase().includes(filter.toLowerCase()) ||
                  ambulance.ambulanceTitle.toLowerCase().includes(filter.toLowerCase()) ||
                  ambulance.ambulanceNumber.toLowerCase().includes(filter.toLowerCase()) ||
                  ambulance.contactInfo.toLowerCase().includes(filter.toLowerCase()) ||
                  ambulance.city.toLowerCase().includes(filter.toLowerCase())
              )
              .map((ambulance) => (
                <TableRow key={ambulance._id}>
                  <TableCell>{ambulance.name}</TableCell>
                  <TableCell>{ambulance.address}</TableCell>
                  <TableCell>{ambulance.ambulanceTitle}</TableCell>
                  <TableCell>{ambulance.ambulanceNumber}</TableCell>
                  <TableCell>{ambulance.icuService ? "Yes" : "No"}</TableCell>
                  <TableCell>{ambulance.contactInfo}</TableCell>
                  <TableCell>{ambulance.city}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEditClick(ambulance)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDeleteClick(ambulance._id)}
                      className="ml-2"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={addingAmbulance}
        onClose={() => setAddingAmbulance(false)}
        aria-labelledby="add-ambulance-modal-title"
        aria-describedby="add-ambulance-modal-description"
      >
        <div className="modal-container bg-slate-600">
          <div className="modal-content">
            <h2 id="add-ambulance-modal-title">Add New Ambulance</h2>
            <form onSubmit={editingAmbulance ? handleUpdateSubmit : handleAddAmbulanceSubmit}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mb-2"
              />
              <TextField
                label="Address"
                variant="outlined"
                fullWidth
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="mb-2"
              />
              <TextField
                label="Ambulance Title"
                variant="outlined"
                fullWidth
                name="ambulanceTitle"
                value={formData.ambulanceTitle}
                onChange={handleChange}
                className="mb-2"
              />
              <TextField
               
               label="Ambulance Number"
               variant="outlined"
               fullWidth
               name="ambulanceNumber"
               value={formData.ambulanceNumber}
               onChange={handleChange}
               className="mb-2"
             />
             <FormControl fullWidth className="mb-2">
               <InputLabel id="icuService-label">ICU Service</InputLabel>
               <Select
                 labelId="icuService-label"
                 id="icuService"
                 value={formData.icuService}
                 onChange={handleChange}
                 name="icuService"
               >
                 <MenuItem value={true}>Yes</MenuItem>
                 <MenuItem value={false}>No</MenuItem>
               </Select>
             </FormControl>
             <TextField
               label="Contact Info"
               variant="outlined"
               fullWidth
               name="contactInfo"
               value={formData.contactInfo}
               onChange={handleChange}
               className="mb-2"
             />
             <TextField
               label="City"
               variant="outlined"
               fullWidth
               name="city"
               value={formData.city}
               onChange={handleChange}
               className="mb-2"
             />
             <Button type="submit" variant="contained" color="primary" className="mb-2">
               {editingAmbulance ? "Update Ambulance" : "Add Ambulance"}
             </Button>
             <Button
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
               variant="contained"
               color="secondary"
               className="mb-2 ml-2"
             >
               Cancel
             </Button>
           </form>
         </div>
       </div>
     </Modal>
   </div>
 );
};

export default Ambulance;
