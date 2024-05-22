
import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';
import BloodInventory from './BloodInventory';
import BloodDonorList from './BloodDonorList';
import BloodRequest from './BloodRequest';



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
        return (
          <div className="h-[90vh] flex items-center justify-center text-6xl px-10 text-center font-bold capitalize">
            Welcome to Blood Bank
            
          </div>
        );
    }
  };
  return (

    <div className="flex px-32 gap-10">
      <div className="w-72 bg-primary text-secondary p-3 h-[90vh] rounded-xl">
        <h1 className="font-bold text-xl">Dashboard</h1>
        <p className="mb-5">Admin</p>
        <nav>
          <ul className="flex flex-col gap-2">
            <li>
              <button
                onClick={() => handleNavigation("BloodInventory")}
                className="btn w-full"
              >
                Add Doctor
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigation("BloodDonorList")}
                className="btn w-full"
              >
                All Doctors
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigation("BloodRequest")}
                className="btn w-full"
              >
                All Users
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <div className="w-full h-[90vh] overflow-y-auto">
        {renderComponent()}
      </div>
    </div>


  );
};

export default BloodBank;
