import { useLogin } from "../context/LoginContext";
import { useAppointment } from "../context/AppointmentContext";

const AppointmentList = () => {
  const { loading, error, user } = useLogin();
  const { appointments, handleDelete } = useAppointment();

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
    <div className="px-32 py-10">
      {user && (
        <h2 className="text-xl font-bold capitalize mb-5">
          All Appointments for {user.name}:
        </h2>
      )}
      <ul>
        {appointments.length > 0 ? (
          appointments.map((appointment) => (
            <li
              key={appointment._id}
              className="p-3 rounded-xl"
              style={{ boxShadow: "0 1px 10px rgb(0,0,0,.3)" }}
            >
              <p>
                <strong>Date: </strong> {appointment.selectedDate}
              </p>
              <p className="capitalize">
                <strong>Name: </strong>
                {appointment.userName}
              </p>
              <p>
                <strong>Time: </strong> {appointment.slotStartTime} -{" "}
                {appointment.slotEndTime}
              </p>
              <p>
                <strong>Doctor: </strong> {appointment.doctorName}
              </p>
              <button
                type="button"
                onClick={(e) => handleDelete(appointment._id)}
                className="btn btn-error ms-auto mt-3"
              >
                Delete Appointment
              </button>
            </li>
          ))
        ) : (
          <div
            className="p-3 rounded-xl"
            style={{ boxShadow: "0 1px 10px rgb(0,0,0,.3)" }}
          >
            No AppointMents Taken
          </div>
        )}
      </ul>
    </div>
  );
};

export default AppointmentList;
