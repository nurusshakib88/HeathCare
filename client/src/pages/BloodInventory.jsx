import { useState, useEffect } from "react";
import axios from "axios";
import { Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useLogin } from "../context/LoginContext";
import { Add, Inventory, LocationOn, WaterDrop } from "@mui/icons-material";

const BloodInventory = () => {
  const { user } = useLogin(); // Get the current user from the context
  const [inventory, setInventory] = useState([]);
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [addingItem, setAddingItem] = useState(false); // New state for adding item
  const [formData, setFormData] = useState({
    bloodGroup: "",
    quantity: "",
    country: "",
    city: "",
    district: "",
    division: "",
  });
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get(`/api/blood-inventory/inventory`);
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

  const handleAddClick = () => {
    setAddingItem(true);
    setFormData({
      bloodGroup: "",
      quantity: "",
      country: "",
      city: "",
      district: "",
      division: "",
    });
  };

  const handleEditClick = (item) => {
    setEditingItem(item);
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
      await axios.delete(`/api/blood-inventory/inventory/${id}`);
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
        `/api/blood-inventory/inventory/${editingItem._id}`,
        formData
      );
      const updatedInventory = inventory.map((item) =>
        item._id === editingItem._id ? response.data : item
      );
      setInventory(updatedInventory);
      setFilteredInventory(updatedInventory);
      setEditingItem(null);
    } catch (error) {
      console.error("Error updating inventory:", error);
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `/api/blood-inventory/inventory`,
        formData
      );
      setInventory([...inventory, response.data]);
      setFilteredInventory([...inventory, response.data]);
      setAddingItem(false);
    } catch (error) {
      console.error("Error adding inventory:", error);
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
      {user?.role === "admin" && (
        <button
          onClick={handleAddClick}
          className="btn btn-primary btn-wide text-secondary mb-5"
        >
          <Add /> Add Inventory
        </button>
      )}
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
                  <LocationOn /> {item.city}, {item.district}, {item.division},{" "}
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
      {(editingItem || addingItem) && (
        <div className="inmodal z-50">
          <div className="inmodal-box">
            <h2 className="text-xl font-bold">
              {editingItem ? "Edit Inventory" : "Add Inventory"}
            </h2>
            <form onSubmit={editingItem ? handleUpdateSubmit : handleAddSubmit}>
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
                {editingItem ? "Update" : "Add"}
              </button>
              <button
                onClick={() => {
                  setEditingItem(null);
                  setAddingItem(false);
                }}
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

export default BloodInventory;
