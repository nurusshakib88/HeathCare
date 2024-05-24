import { useLogin } from "../context/LoginContext";
import { useAppointment } from "../context/AppointmentContext";
import { Delete } from "@mui/icons-material";

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

      <table className="table table-zebra table-lg rounded-lg overflow-hidden">
        <thead className="bg-primary text-secondary">
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Doctor</th>
            <th>Request</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <tr key={appointment._id}>
                <td>{appointment.selectedDate}</td>
                <td>
                  {appointment.slotStartTime} - {appointment.slotEndTime}
                </td>
                <td className="w-52 ">
                  <p className="line-clamp-1">{appointment.doctorName}</p>
                </td>

                <td className="w-72">
                  <p className="line-clamp-3">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Quasi animi atque ipsam dolore dolor laboriosam est
                    accusamus
                  </p>
                </td>
                <td>{appointment.status}</td>
                <td>
                  <button
                    type="button"
                    onClick={(e) => handleDelete(appointment._id)}
                    className="btn btn-circle bg-red-300 text-secondary"
                  >
                    <Delete />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colspan="6" className="text-center">
                No AppointMents Taken
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentList;
