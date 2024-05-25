import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import BloodInventory from "./BloodInventory";
import BloodDonorList from "./BloodDonorList";
import BloodRequest from "./BloodRequest";
import {
  Add,
  Bloodtype,
  Inventory,
  LogoutOutlined,
  PostAdd,
  WaterDrop,
} from "@mui/icons-material";
import Logout from "../components/Logout";
import DashboardNav from "../components/DashboardNav";
import BloodBankNav from "../components/BloodBankNav";

const BloodBank = () => {
  const [currentComponent, setCurrentComponent] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Parse the URL query parameter to determine the current view
    const params = new URLSearchParams(location.search);
    const view = params.get("view");
    setCurrentComponent(view);
  }, [location.search]);

  const handleNavigation = (component) => {
    setCurrentComponent(component);
    navigate(`?view=${component}`);
  };

  const renderComponent = () => {
    switch (currentComponent) {
      case "BloodInventory":
        return <BloodInventory />;
      case "BloodDonorList":
        return <BloodDonorList />;
      case "BloodRequest":
        return <BloodRequest />;
      default:
        return <BloodInventory />;
    }
  };

  return (
    <div className="flex">
      <aside className="bg-primary pt-5 px-1 w-64 text-secondary shadow-2xl z-50 h-screen flex flex-col justify-between">
        <div>
          <div className="px-2">
            <NavLink to="/" className="font-bold text-2xl">
              shushastho.
            </NavLink>
            <p className="mb-5 text-secondary p-3 font-bold border-0 shadow-md bg-red-500 badge">
              Blood Bank
            </p>
          </div>

          <div className="flex flex-col">
            <button
              onClick={() => handleNavigation("BloodInventory")}
              className={`flex gap-2 hover:bg-secondary hover:text-primary transition-all duration-300 ease-in-out px-2 py-3 ${
                currentComponent === "BloodInventory"
                  ? "bg-secondary text-primary"
                  : ""
              }`}
            >
              <Inventory /> Blood Inventory
            </button>
            <button
              onClick={() => handleNavigation("BloodDonorList")}
              className={`flex gap-2 hover:bg-secondary hover:text-primary transition-all duration-300 ease-in-out px-2 py-3 ${
                currentComponent === "BloodDonorList"
                  ? "bg-secondary text-primary"
                  : ""
              }`}
            >
              <WaterDrop /> Blood Donor List
            </button>

            <button
              onClick={() => handleNavigation("BloodRequest")}
              className={`flex gap-2 hover:bg-secondary hover:text-primary transition-all duration-300 ease-in-out px-2 py-3 ${
                currentComponent === "BloodRequest"
                  ? "bg-secondary text-primary"
                  : ""
              }`}
            >
              <PostAdd /> Blood Request
            </button>
          </div>
        </div>

        <Logout
          icon={<LogoutOutlined />}
          className="flex gap-2 hover:bg-secondary hover:text-primary transition-all duration-300 ease-in-out px-2 py-3 border-t"
        />
      </aside>
      <div className="w-full h-screen overflow-y-auto">
        <BloodBankNav />
        {renderComponent()}
      </div>
    </div>
  );
};

export default BloodBank;
