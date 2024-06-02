import {
  BloodtypeOutlined,
  HealthAndSafetyOutlined,
  LocalShippingOutlined,
  MedicalInformationOutlined,
} from "@mui/icons-material";

import BlobOutline from "../assets/bg.svg";
import Blob from "../assets/blob.svg";
import BannerImg from "../assets/banner.png";
import { NavLink } from "react-router-dom";

const Banner = () => {
  const Feature = ({ title, icon, desc }) => (
    <div
      className="text-center backdrop-blur-md hover:bg-primary px-3 py-8 rounded-xl transition-all ease-in-out duration-300"
      style={{ boxShadow: "0 1px 10px rgb(0,0,0,.3)" }}
    >
      <div className="w-[60px] aspect-square flex items-center justify-center mx-auto rounded-full mb-5 bg-secondary text-primary shadow-xl">
        {icon}
      </div>

      <h2 className="text-xl font-bold mb-3">{title}</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur elit. Autem quisquam facilis.
      </p>
    </div>
  );

  return (
    <div className="relative py-8 overflow-hidden">
      <div className="grid grid-cols-12 gap-10">
        <div className="col-span-6 mt-20">
          <h1 className="text-6xl font-bold mb-5">
            We Back You With a Smile Forever
          </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci
            illum reiciendis dicta veritatis quos soluta, itaque animi, sequi.
          </p>
          <div className="flex gap-5 mt-5">
            <NavLink
              to="/make-an-appointment"
              className="btn btn-primary text-secondary btn-wide"
            >
              Book an Appointment
            </NavLink>
            <NavLink
              to="/health-tips"
              className="btn btn-primary text-secondary btn-wide"
            >
              Learn More
            </NavLink>
          </div>
        </div>
        <div className="col-span-6">
          <div className="relative h-[480px] w-full rounded-2xl overflow-hidden">
            <img
              src={BannerImg}
              className="absolute right-0 z-20 pt-5 drop-shadow-xl w-8/12"
              alt="Doctor"
            />
            <img
              src={BlobOutline}
              className="absolute right-0 w-[80%] z-10 rotate-90"
              alt="Background Blob Outline"
            />
            <img
              src={Blob}
              className="absolute right-0 w-[80%] z-10 rotate-45"
              alt="Background Blob"
            />
            <div className="h-full w-[55%] bg-primary absolute right-0 top-0 bottom-0 rounded-3xl"></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-8 -mt-14 px-12 z-20 relative">
        <Feature
          title="24/7 Support"
          icon={<HealthAndSafetyOutlined fontSize="large" />}
        />
        <Feature
          title="Qualified Doctors"
          icon={<MedicalInformationOutlined fontSize="large" />}
        />
        <Feature
          title="Ambulance Service"
          icon={<LocalShippingOutlined fontSize="large" />}
        />
        <Feature
          title="Blood Bank"
          icon={<BloodtypeOutlined fontSize="large" />}
        />
      </div>
    </div>
  );
};

export default Banner;
