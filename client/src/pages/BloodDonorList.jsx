import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BloodDonorList = () => {
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/donors/all')
      .then(response => {
        setDonors(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the donor list!", error);
      });
  }, []);

  return (
    <div>
      <h2>Donor List</h2>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact</th>
            <th>Division</th>
            <th>District</th>
            <th>City</th>
            <th>Blood Group</th>
          </tr>
        </thead>
        <tbody>
          {donors.map(donor => (
            <tr key={donor._id}>
              <td>{donor.name}</td>
              <td>{donor.contactInfo}</td>
              <td>{donor.division}</td>
              <td>{donor.district}</td>
              <td>{donor.city}</td>
              <td>{donor.bloodGroup}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BloodDonorList;
