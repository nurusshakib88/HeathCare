import { useDoctor } from "../context/DoctorContext";
import { Delete } from "@mui/icons-material";
const AllDoctors = () => {
  const { doctors, handleDelete, generateTimeSlots } = useDoctor();

  return (
    <div className="w-full py-10">
      <h1 className="text-2xl font-bold text-center mb-10">All Doctors</h1>
      {doctors.map((doctor) => (
        <div
          key={doctor._id}
          className="flex items-center gap-5 p-3 rounded-xl mb-5 shadow-lg"
        >
          <img
            src={doctor.imageUrl}
            alt=""
            className="w-32 aspect-square rounded-xl object-cover"
          />
          <div>
            {" "}
            <h2>{doctor.name}</h2>
            <p>
              Specialization: {doctor.area} - {doctor.degree}
            </p>
            <p>Visit: {doctor.visit}</p>
            <p>
              Location: {doctor.selectedDistrict},{doctor.selectedDivision}
            </p>
          </div>
          <button
            type="button"
            onClick={(e) => handleDelete(doctor._id)}
            className="btn btn-error btn-circle ms-auto text-secondary"
          >
            <Delete />
          </button>
        </div>
      ))}
    </div>
  );
};

export default AllDoctors;
