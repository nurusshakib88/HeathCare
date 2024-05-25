import React, { useState, useEffect } from "react";
import axios from "axios";
import { Delete } from "@mui/icons-material";

const Allusers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`/api/users/all`, {
          withCredentials: true,
        });
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError(
          error.response ? error.response.data.message : "An error occurred"
        );
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`/api/users/deleteuser/${id}`)
      .then((res) => {
        console.log(res);
        setUsers(users.filter((user) => user._id !== id));
      })
      .catch((err) => console.log(err));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-full py-10">
      <h1 className="text-2xl font-bold text-center mb-10">All Users</h1>
      <table className="table  table-zebra w-full text-center table-lg">
        <thead className="bg-primary text-secondary">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Sex</th>
            <th>Blood Group</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map(
              (user) =>
                user.role != "admin" && (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.sex}</td>
                    <td>{user.blood}</td>
                    <td>{user.age}</td>
                    <td>
                      <button
                        type="button"
                        onClick={(e) => handleDelete(user._id)}
                        className="btn btn-error btn-circle ms-auto text-secondary"
                      >
                        <Delete />
                      </button>
                    </td>
                  </tr>
                )
            )}
        </tbody>
      </table>
    </div>
  );
};

export default Allusers;
