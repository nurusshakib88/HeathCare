import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAppointment } from "../context/AppointmentContext";
import { useLogin } from "../context/LoginContext";
import { Delete, Edit, Save, Cancel } from "@mui/icons-material";

const AllAppointments = () => {
  const { handleDelete, allAppointments, fetchAppointments, handleEdit } =
    useAppointment();
  const { loading, error, user } = useLogin();
  const [editableAppointment, setEditableAppointment] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleEditClick = (appointment) => {
    setEditableAppointment(appointment);
  };

  const handleSaveClick = async () => {
    // Send updated appointment to backend
    try {
      axios.put(
        `/api/appointments/editappointment/${editableAppointment._id}`,
        editableAppointment
      );
      setEditableAppointment(null); // Clear editableAppointment state
      fetchAppointments(); // Refresh appointments
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  };

  const handleCancelClick = () => {
    setEditableAppointment(null); // Clear editableAppointment state
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableAppointment({
      ...editableAppointment,
      [name]: value,
    });
  };

  if (loading) {
    return <div className="px-32 py-10">Loading...</div>;
  }

  if (error) {
    return <div className="px-32 py-10">Error: {error}</div>;
  }

  if (!user) {
    return <div className="px-32 py-10">User not found.</div>;
  }

  return (
    <div className="w-full py-10 px-3">
      <h1 className="text-2xl font-bold text-center mb-10">All Doctors</h1>
      <table className="table table-zebra table-lg rounded-lg overflow-hidden">
        <thead className="bg-primary text-secondary">
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Doctor</th>
            <th>Patient</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {allAppointments.length > 0 ? (
            allAppointments.map((appointment) => (
              <tr key={appointment._id}>
                <td>
                  {editableAppointment &&
                  editableAppointment._id === appointment._id ? (
                    <input
                      type="date"
                      name="selectedDate"
                      value={editableAppointment.selectedDate}
                      onChange={handleChange}
                    />
                  ) : (
                    appointment.selectedDate
                  )}
                </td>
                <td>
                  {appointment.slotStartTime} - {appointment.slotEndTime}
                </td>
                <td className="w-52">
                  <p className="line-clamp-1">{appointment.doctorName}</p>
                </td>
                <td className="w-52">
                  <p className="line-clamp-1">{appointment.userName}</p>
                </td>
                <td>
                  {editableAppointment &&
                  editableAppointment._id === appointment._id ? (
                    <select
                      name="status"
                      value={editableAppointment.status}
                      onChange={handleChange}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  ) : (
                    appointment.status
                  )}
                </td>
                <td>
                  <div className="flex">
                    {editableAppointment &&
                    editableAppointment._id === appointment._id ? (
                      <>
                        <button
                          type="button"
                          onClick={handleSaveClick}
                          className="btn btn-circle bg-green-300 text-secondary mr-2"
                        >
                          <Save />
                        </button>
                        <button
                          type="button"
                          onClick={handleCancelClick}
                          className="btn btn-circle bg-red-300 text-secondary"
                        >
                          <Cancel />
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleEditClick(appointment)}
                        className="btn btn-circle bg-blue-300 text-secondary"
                      >
                        <Edit />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => handleDelete(appointment._id)}
                      className="btn btn-circle bg-red-300 text-secondary ml-2"
                    >
                      <Delete />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No Appointments Taken
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllAppointments;
