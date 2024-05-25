import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BloodInventory from "./BloodInventory";
import BloodDonorList from "./BloodDonorList";
import BloodRequest from "./BloodRequest";

const BloodBank = () => {
  const [currentComponent, setCurrentComponent] = useState(null);
  const navigate = useNavigate();

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
      <aside className="w-64 bg-primary text-secondary p-3 h-screen flex flex-col justify-between">
        <div>
          <h1 className="font-bold text-xl">Dashboard</h1>
          <p className="mb-5">Admin</p>
          <nav>
            <ul className="flex flex-col gap-2">
              <li>
                <button
                  onClick={() => handleNavigation("BloodInventory")}
                  className="btn w-full"
                >
                  Blood Inventory
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("BloodDonorList")}
                  className="btn w-full"
                >
                  Blood Donor List
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("BloodRequest")}
                  className="btn w-full"
                >
                  Blood Request
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
      <div className="w-full h-screen overflow-y-auto">{renderComponent()}</div>
    </div>
  );
};

export default BloodBank;
