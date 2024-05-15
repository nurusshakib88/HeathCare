import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="py-3 px-32 text-center mt-10 bg-primary text-secondary">
      All rights Reserved{" "}
      <NavLink to="/" className="font-bold">
        SHUSHASTHO
      </NavLink>
    </div>
  );
};

export default Footer;
