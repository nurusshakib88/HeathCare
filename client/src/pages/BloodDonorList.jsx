import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BloodDonorList = () => {
    const [donors, setDonors] = useState([]);
    const [editingDonor, setEditingDonor] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        bloodGroup: '',
        contactInfo: ''
    });

    useEffect(() => {
        const fetchDonors = async () => {
            try {
                const response = await axios.get('http://localhost:3001/donors');
                setDonors(response.data);
            } catch (error) {
                console.error('Error fetching donors:', error);
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
            contactInfo: donor.contactInfo
        });
    };

    const handleDeleteClick = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/donors/${id}`);
            setDonors(donors.filter(donor => donor._id !== id));
        } catch (error) {
            console.error('Error deleting donor:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:3001/donors/${editingDonor._id}`, formData);
            setDonors(donors.map(donor => (donor._id === editingDonor._id ? response.data : donor)));
            setEditingDonor(null);
        } catch (error) {
            console.error('Error updating donor:', error);
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Donors</h1>
            <ul className="list-disc pl-5">
                {donors.length > 0 ? (
                    donors.map(donor => (
                        <li key={donor._id} className="mb-2">
                            <strong>Name:</strong> {donor.name}, 
                            <strong> Address:</strong> {donor.address}, 
                            <strong> Blood Group:</strong> {donor.bloodGroup}, 
                            <strong> Contact Info:</strong> {donor.contactInfo}
                            <button onClick={() => handleEditClick(donor)} className="ml-2 px-2 py-1 bg-blue-500 text-white rounded">Edit</button>
                            <button onClick={() => handleDeleteClick(donor._id)} className="ml-2 px-2 py-1 bg-red-500 text-white rounded">Delete</button>
                        </li>
                    ))
                ) : (
                    <p>No donors available</p>
                )}
            </ul>

            {editingDonor && (
                <div className="inmodal">
                    <div className="inmodal-box">
                        <h2 className="text-xl font-bold">Edit Donor</h2>
                        <form onSubmit={handleUpdateSubmit}>
                            <div className="mb-2">
                                <label className="block">Name</label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} className="input input-bordered w-full"/>
                            </div>
                            <div className="mb-2">
                                <label className="block">Address</label>
                                <input type="text" name="address" value={formData.address} onChange={handleChange} className="input input-bordered w-full"/>
                            </div>
                            <div className="mb-2">
                                <label className="block">Blood Group</label>
                                <input type="text" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className="input input-bordered w-full"/>
                            </div>
                            <div className="mb-2">
                                <label className="block">Contact Info</label>
                                <input type="text" name="contactInfo" value={formData.contactInfo} onChange={handleChange} className="input input-bordered w-full"/>
                            </div>
                            <button type="submit" className="mt-2 px-4 py-2 bg-green-500 text-white rounded">Update</button>
                            <button onClick={() => setEditingDonor(null)} className="ml-2 px-4 py-2 bg-gray-500 text-white rounded">Cancel</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BloodDonorList;
