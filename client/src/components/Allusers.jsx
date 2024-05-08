import React, { useState, useEffect } from "react";
import axios from "axios";

const Allusers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/users/all", {
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
      .delete(`http://localhost:3001/users/deleteuser/${id}`)
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
    <div>
      <h1>All Users</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Age</th>
            <th>Role</th>
            <th>Button</th>
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
                    <td>{user.age}</td>
                    <td>{user.role}</td>
                    <td>
                      <button
                        type="button"
                        onClick={(e) => handleDelete(user._id)}
                        className="btn btn-danger btn-circle ms-auto"
                      >
                        delete
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
