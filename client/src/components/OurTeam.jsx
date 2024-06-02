import { useDoctor } from "../context/DoctorContext";

const OurTeam = () => {
  const { doctors, handleDelete, generateTimeSlots } = useDoctor();
  return (
    <div className="my-20">
      <h2 className="text-xl font-medium text-primary mb-2">Team</h2>
      <h1 className="font-bold text-5xl pe-5 mb-5">Our Team</h1>

      <div className="grid grid-cols-5 gap-8">
        {Array.isArray(doctors) &&
          doctors.slice(0, 5).map((doctor) => (
            <div
              key={doctor._id}
              className="text-center rounded-xl overflow-hidden"
              style={{ boxShadow: "0 1px 10px rgb(0,0,0,.3)" }}
            >
              <img
                src={doctor.imageUrl}
                alt=""
                className="w-full h-[200px] object-top mx-auto mb-3 object-cover"
              />
              <h2 className="text-xl font-bold">{doctor.name}</h2>
              <p className="text-ellipsis pb-3">{doctor.area}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default OurTeam;
