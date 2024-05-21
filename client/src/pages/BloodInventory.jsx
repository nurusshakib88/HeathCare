import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BloodInventory = () => {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/users/all')
      .then(response => {
        setInventory(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the blood inventory!", error);
      });
  }, []);

  return (
    <div>
      <h2>Blood Inventory</h2>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th>Blood Group</th>
            <th>Quantity</th>
            <th>Division</th>
            <th>District</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map(item => (
            <tr key={item._id}>
              <td>{item.bloodGroup}</td>
              <td>{item.quantity}</td>
              <td>{item.division}</td>
              <td>{item.district}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BloodInventory;
