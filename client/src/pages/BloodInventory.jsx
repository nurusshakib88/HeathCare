import { useState, useEffect } from "react";
import axios from "axios";
import { Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useLogin } from "../context/LoginContext";
import { Inventory, LocationOn, WaterDrop } from "@mui/icons-material";

const BloodInventory = () => {
  const { user } = useLogin(); // Get the current user from the context
  const [inventory, setInventory] = useState([]);
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    bloodGroup: "",
    quantity: "",
    country: "",
    city: "",
    district: "",
    division: "",
  });
  const [filter, setFilter] = useState("");
  // const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/blood-inventory/inventory"
        );
        setInventory(response.data);
        setFilteredInventory(response.data);
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    };

    fetchInventory();
  }, []);

  useEffect(() => {
    filterInventory();
  }, [filter, inventory]);

  const handleEditClick = (item) => {
    setEditingItem(item);
    // setOpenModal(true);
    setFormData({
      bloodGroup: item.bloodGroup,
      quantity: item.quantity,
      country: item.country,
      city: item.city,
      district: item.district,
      division: item.division,
    });
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(
        `http://localhost:3001/blood-inventory/inventory/${id}`
      );
      setInventory(inventory.filter((item) => item._id !== id));
      setFilteredInventory(filteredInventory.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting inventory:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3001/blood-inventory/inventory/${editingItem._id}`,
        formData
      );
      const updatedInventory = inventory.map((item) =>
        item._id === editingItem._id ? response.data : item
      );
      setInventory(updatedInventory);
      setFilteredInventory(updatedInventory);
      setEditingItem(null);
      // setOpenModal(false);
    } catch (error) {
      console.error("Error updating inventory:", error);
    }
  };

  const filterInventory = () => {
    setFilteredInventory(
      inventory.filter(
        (item) =>
          item.bloodGroup.toLowerCase().includes(filter.toLowerCase()) ||
          item.quantity.toString().includes(filter) ||
          item.country.toLowerCase().includes(filter.toLowerCase()) ||
          item.city.toLowerCase().includes(filter.toLowerCase()) ||
          item.district.toLowerCase().includes(filter.toLowerCase()) ||
          item.division.toLowerCase().includes(filter.toLowerCase())
      )
    );
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Blood Inventory</h1>
      <input
        placeholder="Search Blood Group"
        value={filter}
        onChange={handleFilterChange}
        className="input input-bordered w-full input-lg mb-10 rounded-xl"
      />
      <div className="grid grid-cols-3 gap-5" spacing={3}>
        {filteredInventory.length > 0 ? (
          filteredInventory.map((item) => (
            <div
              className="grid grid-cols-3 gap-3 items-center p-3 rounded-xl"
              key={item._id}
              style={{ boxShadow: "0 1px 10px rgb(0,0,0,.3)" }}
            >
              <div>
                <h1 className="mb-2 flex items-center gap-2 text-2xl font-medium">
                  <WaterDrop
                    className="text-red-500"
                    sx={{ fontSize: "45px" }}
                  />{" "}
                  {item.bloodGroup}
                </h1>
              </div>
              <div className="col-span-2">
                <p className="flex gap-3 mb-2">
                  <LocationOn /> {item.city}, {item.district}, {item.division},
                  {item.country}
                </p>
                <h3 className="mb-2 flex gap-3 text-xl font-medium">
                  <Inventory /> {item.quantity}
                </h3>
                {user?.role === "admin" && (
                  <div className="mt-5">
                    <button
                      onClick={() => handleEditClick(item)}
                      className="btn btn-circle btn-primary text-secondary me-3"
                    >
                      <EditIcon />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(item._id)}
                      className="btn btn-circle btn-error text-secondary"
                    >
                      <DeleteIcon />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <Typography>No blood inventory available</Typography>
        )}
      </div>
      {editingItem && (
        <div className="inmodal z-50">
          <div className="inmodal-box">
            <h2 className="text-xl font-bold">Edit Inventory</h2>
            <form onSubmit={handleUpdateSubmit}>
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
                <label className="block">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="mb-2">
                <label className="block">Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="mb-2">
                <label className="block">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="mb-2">
                <label className="block">District</label>
                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="mb-2">
                <label className="block">Division</label>
                <input
                  type="text"
                  name="division"
                  value={formData.division}
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
                onClick={() => setEditingItem(null)}
                className="ml-2 px-4 py-2 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {/* <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openModal}>
                    <div className="modal">
                        <div className="modal-box">
                            <h2 className="text-xl font-bold">Edit Inventory</h2>
                            <form onSubmit={handleUpdateSubmit}>
                                <div className="mb-2">
                                    <TextField
                                        label="Blood Group"
                                        name="bloodGroup"
                                        value={formData.bloodGroup}
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                </div>
                                <div className="mb-2">
                                    <TextField
                                        label="Quantity"
                                        name="quantity"
                                        type="number"
                                        value={formData.quantity}
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                </div>
                                <div className="mb-2">
                                    <TextField
                                        label="Country"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                </div>
                                <div className="mb-2">
                                    <TextField
                                        label="City"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                </div>
                                <div className="mb-2">
                                    <TextField
                                        label="District"
                                        name="district"
                                        value={formData.district}
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                </div>
                                <div className="mb-2">
                                    <TextField
                                        label="Division"
                                        name="division"
                                        value={formData.division}
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                </div>
                                <Button type="submit" variant="contained" color="primary" className="mt-2">Update</Button>
                                <Button onClick={() => setOpenModal(false)} variant="contained" color="default" className="mt-2 ml-2">Cancel</Button>
                            </form>
                        </div>
                    </div>
                </Fade>
            </Modal> */}
    </div>
  );
};

export default BloodInventory;

// import  { useState, useEffect } from 'react';
// import axios from 'axios';

// const BloodInventory = () => {
//     const [inventory, setInventory] = useState([]);
//     const [editingItem, setEditingItem] = useState(null);
//     const [formData, setFormData] = useState({
//         bloodGroup: '',
//         quantity: '',
//         country: '',
//         city: '',
//         district: '',
//         division: ''
//     });

//     useEffect(() => {
//         const fetchInventory = async () => {
//             try {
//                 const response = await axios.get('http://localhost:3001/blood-inventory/inventory');
//                 setInventory(response.data);
//             } catch (error) {
//                 console.error('Error fetching inventory:', error);
//             }
//         };

//         fetchInventory();
//     }, []);

//     const handleEditClick = (item) => {
//         setEditingItem(item);
//         setFormData({
//             bloodGroup: item.bloodGroup,
//             quantity: item.quantity,
//             country: item.country,
//             city: item.city,
//             district: item.district,
//             division: item.division
//         });
//     };

//     const handleDeleteClick = async (id) => {
//         try {
//             await axios.delete(`http://localhost:3001/blood-inventory/inventory/${id}`);
//             setInventory(inventory.filter(item => item._id !== id));
//         } catch (error) {
//             console.error('Error deleting inventory:', error);
//         }
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prevState => ({ ...prevState, [name]: value }));
//     };

//     const handleUpdateSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.put(`http://localhost:3001/blood-inventory/inventory/${editingItem._id}`, formData);
//             setInventory(inventory.map(item => (item._id === editingItem._id ? response.data : item)));
//             setEditingItem(null);
//         } catch (error) {
//             console.error('Error updating inventory:', error);
//         }
//     };

//     return (
//         <div>
//             <h1 className="text-2xl font-bold mb-4 ">Blood Inventory</h1>
// <div className='grid lg:grid-cols-3 lg:gap-3 md:grid-cols-2 md:gap-1 sm:grid-cols-1 sm:gap-2'>
//             {inventory.length > 0 ? (
//                     inventory.map(item => (
//           <>  <div key={item._id}  className=" mb-2 card w-96 bg-base-100 shadow-xl">
//   <div className="card-body items-center text-center">
//     <strong>Blood Group:</strong> {item.bloodGroup},
//                             <strong> Quantity:</strong> {item.quantity},
//                             <strong> Location:</strong> {item.city}, {item.district}, {item.division}, {item.country}
//                             <button onClick={() => handleEditClick(item)} className="ml-2 px-2 py-1 bg-blue-500 text-white rounded">Edit</button>
//                             <button onClick={() => handleDeleteClick(item._id)} className="ml-2 px-2 py-1 bg-red-500 text-white rounded">Delete</button>

//   </div>
// </div> </> ))
//                 ) : (
//                     <p>No blood inventory available</p>
//                 )}

// </div>

//             {/* <ul className="list-disc pl-5">
//                 {inventory.length > 0 ? (
//                     inventory.map(item => (
//                         <li key={item._id} className="mb-2">
//                             <strong>Blood Group:</strong> {item.bloodGroup},
//                             <strong> Quantity:</strong> {item.quantity},
//                             <strong> Location:</strong> {item.city}, {item.district}, {item.division}, {item.country}
//                             <button onClick={() => handleEditClick(item)} className="ml-2 px-2 py-1 bg-blue-500 text-white rounded">Edit</button>
//                             <button onClick={() => handleDeleteClick(item._id)} className="ml-2 px-2 py-1 bg-red-500 text-white rounded">Delete</button>
//                         </li>
//                     ))
//                 ) : (
//                     <p>No blood inventory available</p>
//                 )}
//             </ul> */}

//             {editingItem && (
//                 <div className="inmodal">
//                     <div className="inmodal-box">
//                         <h2 className="text-xl font-bold">Edit Inventory</h2>
//                         <form onSubmit={handleUpdateSubmit}>
//                             <div className="mb-2">
//                                 <label className="block">Blood Group</label>
//                                 <input type="text" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className="input input-bordered w-full"/>
//                             </div>
//                             <div className="mb-2">
//                                 <label className="block">Quantity</label>
//                                 <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} className="input input-bordered w-full"/>
//                             </div>
//                             <div className="mb-2">
//                                 <label className="block">Country</label>
//                                 <input type="text" name="country" value={formData.country} onChange={handleChange} className="input input-bordered w-full"/>
//                             </div>
//                             <div className="mb-2">
//                                 <label className="block">City</label>
//                                 <input type="text" name="city" value={formData.city} onChange={handleChange} className="input input-bordered w-full"/>
//                             </div>
//                             <div className="mb-2">
//                                 <label className="block">District</label>
//                                 <input type="text" name="district" value={formData.district} onChange={handleChange} className="input input-bordered w-full"/>
//                             </div>
//                             <div className="mb-2">
//                                 <label className="block">Division</label>
//                                 <input type="text" name="division" value={formData.division} onChange={handleChange} className="input input-bordered w-full"/>
//                             </div>
//                             <button type="submit" className="mt-2 px-4 py-2 bg-green-500 text-white rounded">Update</button>
//                             <button onClick={() => setEditingItem(null)} className="ml-2 px-4 py-2 bg-gray-500 text-white rounded">Cancel</button>
//                         </form>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default BloodInventory;

// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Grid, Button, TextField, Card, CardContent, Typography, Modal, Backdrop, Fade } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';

// const BloodInventory = () => {
//     const [inventory, setInventory] = useState([]);
//     const [filteredInventory, setFilteredInventory] = useState([]);
//     const [editingItem, setEditingItem] = useState(null);
//     const [formData, setFormData] = useState({
//         bloodGroup: '',
//         quantity: '',
//         country: '',
//         city: '',
//         district: '',
//         division: ''
//     });
//     const [filter, setFilter] = useState('');
//     const [openModal, setOpenModal] = useState(false);

//     useEffect(() => {
//         const fetchInventory = async () => {
//             try {
//                 const response = await axios.get('http://localhost:3001/blood-inventory/inventory');
//                 setInventory(response.data);
//                 setFilteredInventory(response.data);
//             } catch (error) {
//                 console.error('Error fetching inventory:', error);
//             }
//         };

//         fetchInventory();
//     }, []);

//     useEffect(() => {
//         filterInventory();
//     }, [filter, inventory]);

//     const handleEditClick = (item) => {
//         setEditingItem(item);
//         setOpenModal(true);
//         setFormData({
//             bloodGroup: item.bloodGroup,
//             quantity: item.quantity,
//             country: item.country,
//             city: item.city,
//             district: item.district,
//             division: item.division
//         });
//     };

//     const handleDeleteClick = async (id) => {
//         try {
//             await axios.delete(`http://localhost:3001/blood-inventory/inventory/${id}`);
//             setInventory(inventory.filter(item => item._id !== id));
//             setFilteredInventory(filteredInventory.filter(item => item._id !== id));
//         } catch (error) {
//             console.error('Error deleting inventory:', error);
//         }
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prevState => ({ ...prevState, [name]: value }));
//     };

//     const handleFilterChange = (e) => {
//         setFilter(e.target.value);
//     };

//     const handleUpdateSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.put(`http://localhost:3001/blood-inventory/inventory/${editingItem._id}`, formData);
//             const updatedInventory = inventory.map(item => (item._id === editingItem._id ? response.data : item));
//             setInventory(updatedInventory);
//             setFilteredInventory(updatedInventory);
//             setEditingItem(null);
//             setOpenModal(false);
//         } catch (error) {
//             console.error('Error updating inventory:', error);
//         }
//     };

//     const filterInventory = () => {
//         setFilteredInventory(inventory.filter(item =>
//             item.bloodGroup.toLowerCase().includes(filter.toLowerCase()) ||
//             item.quantity.toString().includes(filter) ||
//             item.country.toLowerCase().includes(filter.toLowerCase()) ||
//             item.city.toLowerCase().includes(filter.toLowerCase()) ||
//             item.district.toLowerCase().includes(filter.toLowerCase()) ||
//             item.division.toLowerCase().includes(filter.toLowerCase())
//         ));
//     };

//     return (
//         <div className="p-8">
//             <h1 className="text-2xl font-bold mb-4">Blood Inventory</h1>
//             <TextField
//                 label="Filter"
//                 variant="outlined"
//                 fullWidth
//                 value={filter}
//                 onChange={handleFilterChange}
//                 className="mb-4"
//             />
//             <Grid container spacing={3}>
//                 {filteredInventory.length > 0 ? (
//                     filteredInventory.map(item => (
//                         <Grid item key={item._id} xs={12} sm={6} md={4}>
//                             <Card className="shadow-xl">
//                                 <CardContent>
//                                     <Typography variant="h6"><strong>Blood Group:</strong> {item.bloodGroup}</Typography>
//                                     <Typography variant="body2"><strong>Quantity:</strong> {item.quantity}</Typography>
//                                     <Typography variant="body2"><strong>Location:</strong> {item.city}, {item.district}, {item.division}, {item.country}</Typography>
//                                     <Button
//                                         startIcon={<EditIcon />}
//                                         onClick={() => handleEditClick(item)}
//                                         variant="contained"
//                                         color="primary"
//                                         className="mt-2"
//                                     >
//                                         Edit
//                                     </Button>
//                                     <Button
//                                         startIcon={<DeleteIcon />}
//                                         onClick={() => handleDeleteClick(item._id)}
//                                         variant="contained"
//                                         color="secondary"
//                                         className="mt-2 ml-2"
//                                     >
//                                         Delete
//                                     </Button>
//                                 </CardContent>
//                             </Card>
//                         </Grid>
//                     ))
//                 ) : (
//                     <Typography>No blood inventory available</Typography>
//                 )}
//             </Grid>
//                    {editingItem && (
//                 <div className="inmodal">
//                     <div className="inmodal-box">
//                         <h2 className="text-xl font-bold">Edit Inventory</h2>
//                         <form onSubmit={handleUpdateSubmit}>
//                             <div className="mb-2">
//                                 <label className="block">Blood Group</label>
//                                 <input type="text" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className="input input-bordered w-full"/>
//                             </div>
//                             <div className="mb-2">
//                                 <label className="block">Quantity</label>
//                                 <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} className="input input-bordered w-full"/>
//                             </div>
//                             <div className="mb-2">
//                                 <label className="block">Country</label>
//                                 <input type="text" name="country" value={formData.country} onChange={handleChange} className="input input-bordered w-full"/>
//                             </div>
//                             <div className="mb-2">
//                                 <label className="block">City</label>
//                                 <input type="text" name="city" value={formData.city} onChange={handleChange} className="input input-bordered w-full"/>
//                             </div>
//                             <div className="mb-2">
//                                 <label className="block">District</label>
//                                 <input type="text" name="district" value={formData.district} onChange={handleChange} className="input input-bordered w-full"/>
//                             </div>
//                             <div className="mb-2">
//                                 <label className="block">Division</label>
//                                 <input type="text" name="division" value={formData.division} onChange={handleChange} className="input input-bordered w-full"/>
//                             </div>
//                             <button type="submit" className="mt-2 px-4 py-2 bg-green-500 text-white rounded">Update</button>
//                             <button onClick={() => setEditingItem(null)} className="ml-2 px-4 py-2 bg-gray-500 text-white rounded">Cancel</button>
//                         </form>
//                     </div>
//                 </div>
//             )}

//             {/* <Modal
//                 open={openModal}
//                 onClose={() => setOpenModal(false)}
//                 aria-labelledby="modal-title"
//                 aria-describedby="modal-description"
//                 closeAfterTransition
//                 BackdropComponent={Backdrop}
//                 BackdropProps={{
//                     timeout: 500,
//                 }}
//             >
//                 <Fade in={openModal}>
//                     <div className="modal">
//                         <div className="modal-box">
//                             <h2 className="text-xl font-bold">Edit Inventory</h2>
//                             <form onSubmit={handleUpdateSubmit}>
//                                 <div className="mb-2">
//                                     <TextField
//                                         label="Blood Group"
//                                         name="bloodGroup"
//                                         value={formData.bloodGroup}
//                                         onChange={handleChange}
//                                         fullWidth
//                                     />
//                                 </div>
//                                 <div className="mb-2">
//                                     <TextField
//                                         label="Quantity"
//                                         name="quantity"
//                                         type="number"
//                                         value={formData.quantity}
//                                         onChange={handleChange}
//                                         fullWidth
//                                     />
//                                 </div>
//                                 <div className="mb-2">
//                                     <TextField
//                                         label="Country"
//                                         name="country"
//                                         value={formData.country}
//                                         onChange={handleChange}
//                                         fullWidth
//                                     />
//                                 </div>
//                                 <div className="mb-2">
//                                     <TextField
//                                         label="City"
//                                         name="city"
//                                         value={formData.city}
//                                         onChange={handleChange}
//                                         fullWidth
//                                     />
//                                 </div>
//                                 <div className="mb-2">
//                                     <TextField
//                                         label="District"
//                                         name="district"
//                                         value={formData.district}
//                                         onChange={handleChange}
//                                         fullWidth
//                                     />
//                                 </div>
//                                 <div className="mb-2">
//                                     <TextField
//                                         label="Division"
//                                         name="division"
//                                         value={formData.division}
//                                         onChange={handleChange}
//                                         fullWidth
//                                     />
//                                 </div>
//                                 <Button type="submit" variant="contained" color="primary" className="mt-2">Update</Button>
//                                 <Button onClick={() => setOpenModal(false)} variant="contained" color="default" className="mt-2 ml-2">Cancel</Button>
//                             </form>
//                         </div>
//                     </div>
//                 </Fade>
//             </Modal> */}
//         </div>
//     );
// };

// export default BloodInventory;
