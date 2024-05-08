import { useLogin } from "../context/LoginContext";
import { useAppointment } from "../context/AppointmentContext";

const AppointmentList = () => {
  const { loading, error, user } = useLogin();
  const { appointments, handleDelete } = useAppointment();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>User not found.</div>;
  }

  return (
    <div>
      <h2>All Appointments for {user.name}</h2>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment._id}>
            <p>Date: {appointment.selectedDate}</p>
            <p>Name: {appointment.userName}</p>
            <p>
              Time: {appointment.slotStartTime} - {appointment.slotEndTime}
            </p>
            <p>Doctor: {appointment.doctorName}</p>
            <button
              type="button"
              onClick={(e) => handleDelete(appointment._id)}
              className="btn btn-danger btn-circle ms-auto"
            >
              delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentList;
