import { useDoctor } from "../context/DoctorContext";

const AllDoctors = () => {
  const { doctors, handleDelete, generateTimeSlots } = useDoctor();

  return (
    <div>
      All Doctors
      {doctors.map((doctor) => (
        <div key={doctor._id}>
          <h2>{doctor.name}</h2>
          <p>Specialization: {doctor.area}</p>
          <p>Degree: {doctor.degree}</p>
          <p>Visit: {doctor.visit}</p>
          <p>Division: {doctor.selectedDivision}</p>
          <p>District: {doctor.selectedDistrict}</p>
          <p>Availability:</p>
          <ul>
            {doctor.availability.map((slot, index) => (
              <li key={index}>
                {slot.day}: {slot.startTime} - {slot.endTime}
                <ul>
                  {generateTimeSlots(
                    new Date(`01/01/2000 ${slot.startTime}`),
                    new Date(`01/01/2000 ${slot.endTime}`)
                  ).map((timeSlot, idx) => (
                    <li key={idx}>
                      {timeSlot.startTime} - {timeSlot.endTime}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <img
            src={doctor.imageUrl}
            alt=""
            className="w-32 h-32 object-cover rounded-full"
          />
          <button
            type="button"
            onClick={(e) => handleDelete(doctor._id)}
            className="btn btn-danger btn-circle ms-auto"
          >
            delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default AllDoctors;
