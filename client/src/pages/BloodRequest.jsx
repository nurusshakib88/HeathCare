import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BloodRequest = () => {
  const [requests, setRequests] = useState([]);
  const [newRequest, setNewRequest] = useState({
    userId: '',
    bloodGroup: '',
    quantity: '',
    urgency: '',
    country: '',
    division: '',
    district: '',
    city: '',
    contactInfo: ''
  });

  useEffect(() => {
    axios.get('http://localhost:3001/blood-requests/all')
      .then(response => {
        setRequests(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the blood requests!", error);
      });
  }, []);

  const handleChange = (e) => {
    setNewRequest({ ...newRequest, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/blood-requests/create', newRequest)
      .then(response => {
        setRequests([...requests, response.data]);
        setNewRequest({
          userId: '',
          bloodGroup: '',
          quantity: '',
          urgency: '',
          country: '',
          division: '',
          district: '',
          city: '',
          contactInfo: ''
        });
      })
      .catch(error => {
        console.error("There was an error creating the blood request!", error);
      });
  };

  return (
    <div>
      <h2>Blood Requests</h2>
      <form onSubmit={handleSubmit}>
        {/* Form fields for blood request */}
        <input type="text" name="userId" value={newRequest.userId} onChange={handleChange} placeholder="User ID" required />
        <input type="text" name="bloodGroup" value={newRequest.bloodGroup} onChange={handleChange} placeholder="Blood Group" required />
        <input type="number" name="quantity" value={newRequest.quantity} onChange={handleChange} placeholder="Quantity" required />
        <input type="text" name="urgency" value={newRequest.urgency} onChange={handleChange} placeholder="Urgency" required />
        <input type="text" name="country" value={newRequest.country} onChange={handleChange} placeholder="Country" required />
        <input type="text" name="division" value={newRequest.division} onChange={handleChange} placeholder="Division" required />
        <input type="text" name="district" value={newRequest.district} onChange={handleChange} placeholder="District" required />
        <input type="text" name="city" value={newRequest.city} onChange={handleChange} placeholder="City" required />
        <input type="text" name="contactInfo" value={newRequest.contactInfo} onChange={handleChange} placeholder="Contact Info" required />
        <button type="submit">Post Request</button>
      </form>

      <h3>All Blood Requests</h3>
      <ul>
        {requests.map(request => (
          <li key={request._id}>
            <p>{request.bloodGroup} - {request.quantity} units</p>
            <p>Urgency: {request.urgency}</p>
            <p>Location: {request.city}, {request.district}, {request.division}</p>
            <p>Contact: {request.contactInfo}</p>
            <p>Comments:</p>
            <ul>
              {request.comments.map(comment => (
                <li key={comment._id}>{comment.comment}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BloodRequest;
