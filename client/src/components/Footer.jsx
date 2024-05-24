import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="px-32 mt-10 bg-primary text-secondary h-[8vh] flex items-center justify-center">
      All rights Reserved
      <NavLink to="/" className="font-bold px-1">
        SHUSHASTHO
      </NavLink>
      2024
    </div>
  );
};

export default Footer;
