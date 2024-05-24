import { NavLink } from "react-router-dom";
import DedicatedDoc from "../assets/dedicated.png";
import DedicatedDoc2 from "../assets/doctor2.png";

const DedicatedDoctor = ({ id }) => {
  return (
    <div className="py-20 grid grid-cols-2 gap-16 items-center" id={id}>
      <div className="relative">
        <img src={DedicatedDoc} alt="" className="rounded-xl" />
        <div className="w-[160px] h-[208px] rounded-xl overflow-hidden absolute right-20 -bottom-20 bg-white px-5 py-2 text-center">
          <img
            src={DedicatedDoc2}
            alt=""
            className="w-full h-[58px] object-cover object-top"
          />
          <div className="absolute top-3 right-3 w-4 h-4 bg-accent rounded-full"></div>
          <h1 className="font-semibold">Dr. Tricia M.</h1>
          <h3 className="text-[11px]">CEO NewGenSmiless</h3>
          <p className="text-[11px]">
            “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed”
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-primary font-semibold">DEDICATED DOCTORS</h3>
        <h1 className="text-[36px] font-bold mb-10">
          A dedicated doctor with the core mission to help
        </h1>
        <div className="me-24 mb-10">
          <p className="mb-5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <p>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
        <NavLink
          to="/make-an-appointment"
          className="btn btn-primary text-secondary me-5"
        >
          Book an Appointment
        </NavLink>
      </div>
    </div>
  );
};

export default DedicatedDoctor;
