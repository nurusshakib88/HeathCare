import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BloodInventory = () => {
    const [inventory, setInventory] = useState([]);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({
        bloodGroup: '',
        quantity: '',
        country: '',
        city: '',
        district: '',
        division: ''
    });

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const response = await axios.get('http://localhost:3001/blood-inventory/inventory');
                setInventory(response.data);
            } catch (error) {
                console.error('Error fetching inventory:', error);
            }
        };

        fetchInventory();
    }, []);

    const handleEditClick = (item) => {
        setEditingItem(item);
        setFormData({
            bloodGroup: item.bloodGroup,
            quantity: item.quantity,
            country: item.country,
            city: item.city,
            district: item.district,
            division: item.division
        });
    };

    const handleDeleteClick = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/blood-inventory/inventory/${id}`);
            setInventory(inventory.filter(item => item._id !== id));
        } catch (error) {
            console.error('Error deleting inventory:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:3001/blood-inventory/inventory/${editingItem._id}`, formData);
            setInventory(inventory.map(item => (item._id === editingItem._id ? response.data : item)));
            setEditingItem(null);
        } catch (error) {
            console.error('Error updating inventory:', error);
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4 ">Blood Inventory</h1>
<div className='grid lg:grid-cols-3 lg:gap-3 md:grid-cols-2 md:gap-1 sm:grid-cols-1 sm:gap-2'>
            {inventory.length > 0 ? (
                    inventory.map(item => (
          <>  <div key={item._id}  className=" mb-2 card w-96 bg-base-100 shadow-xl">
  <div className="card-body items-center text-center">
    <strong>Blood Group:</strong> {item.bloodGroup}, 
                            <strong> Quantity:</strong> {item.quantity}, 
                            <strong> Location:</strong> {item.city}, {item.district}, {item.division}, {item.country}
                            <button onClick={() => handleEditClick(item)} className="ml-2 px-2 py-1 bg-blue-500 text-white rounded">Edit</button>
                            <button onClick={() => handleDeleteClick(item._id)} className="ml-2 px-2 py-1 bg-red-500 text-white rounded">Delete</button>
                        
  </div>
</div> </> ))
                ) : (
                    <p>No blood inventory available</p>
                )}

</div>


            <ul className="list-disc pl-5">
                {inventory.length > 0 ? (
                    inventory.map(item => (
                        <li key={item._id} className="mb-2">
                            <strong>Blood Group:</strong> {item.bloodGroup}, 
                            <strong> Quantity:</strong> {item.quantity}, 
                            <strong> Location:</strong> {item.city}, {item.district}, {item.division}, {item.country}
                            <button onClick={() => handleEditClick(item)} className="ml-2 px-2 py-1 bg-blue-500 text-white rounded">Edit</button>
                            <button onClick={() => handleDeleteClick(item._id)} className="ml-2 px-2 py-1 bg-red-500 text-white rounded">Delete</button>
                        </li>
                    ))
                ) : (
                    <p>No blood inventory available</p>
                )}
            </ul>

            {editingItem && (
                <div className="inmodal">
                    <div className="inmodal-box">
                        <h2 className="text-xl font-bold">Edit Inventory</h2>
                        <form onSubmit={handleUpdateSubmit}>
                            <div className="mb-2">
                                <label className="block">Blood Group</label>
                                <input type="text" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className="input input-bordered w-full"/>
                            </div>
                            <div className="mb-2">
                                <label className="block">Quantity</label>
                                <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} className="input input-bordered w-full"/>
                            </div>
                            <div className="mb-2">
                                <label className="block">Country</label>
                                <input type="text" name="country" value={formData.country} onChange={handleChange} className="input input-bordered w-full"/>
                            </div>
                            <div className="mb-2">
                                <label className="block">City</label>
                                <input type="text" name="city" value={formData.city} onChange={handleChange} className="input input-bordered w-full"/>
                            </div>
                            <div className="mb-2">
                                <label className="block">District</label>
                                <input type="text" name="district" value={formData.district} onChange={handleChange} className="input input-bordered w-full"/>
                            </div>
                            <div className="mb-2">
                                <label className="block">Division</label>
                                <input type="text" name="division" value={formData.division} onChange={handleChange} className="input input-bordered w-full"/>
                            </div>
                            <button type="submit" className="mt-2 px-4 py-2 bg-green-500 text-white rounded">Update</button>
                            <button onClick={() => setEditingItem(null)} className="ml-2 px-4 py-2 bg-gray-500 text-white rounded">Cancel</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BloodInventory;
