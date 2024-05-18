import React from "react";
import CountUp from "react-countup";

const OurStatus = () => {
  const Status = ({ value, unit, title }) => (
    <div className="text-center">
      <h1 className="text-5xl font-bold text-primary p-3">
        <CountUp end={value} />
        {unit}
      </h1>
      <h2 className="font-semibold">{title}</h2>
    </div>
  );

  return (
    <div className="grid grid-cols-4 gap-5 py-10">
      <Status title="Happy Customers" value="15" unit="M" />
      <Status title="Monthly Visitors" value="5" unit="M" />
      <Status title="Countries Worldwide" value="115" />
      <Status title="Service Rating" value="8" unit="M" />
    </div>
  );
};

export default OurStatus;
