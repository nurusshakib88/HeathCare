import { useDoctor } from "../context/DoctorContext";
import { Delete } from "@mui/icons-material";
const AllDoctors = () => {
  const { doctors, handleDelete } = useDoctor();

  return (
    <div className="w-full py-10 px-3">
      <h1 className="text-2xl font-bold text-center mb-10">All Doctors</h1>
      <div className="grid grid-cols-2 gap-5">
        {doctors.map((doctor) => (
          <div
            key={doctor._id}
            className="flex items-center gap-5 p-3 rounded-xl"
            style={{ boxShadow: "0 1px 10px rgb(0,0,0,.3)" }}
          >
            <img
              src={doctor.imageUrl}
              alt=""
              className="w-24 aspect-square rounded-xl object-cover"
            />
            <div>
              <h2>
                {doctor.name} - {doctor.degree}
              </h2>
              <p>Specialization: {doctor.area}</p>
              <p>Visit: {doctor.visit} BDT</p>
              <p>
                Location: {doctor.selectedDistrict}, {doctor.selectedDivision}
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
    </div>
  );
};

export default AllDoctors;
