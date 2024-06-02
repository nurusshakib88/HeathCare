import React from "react";
import DocPat from "../assets/doc-pat.jpg";
import { NavLink } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="grid grid-cols-2 gap-10 py-20 items-center">
      <div>
        <h2 className="text-xl font-medium text-primary mb-2">Who We Are</h2>
        <h1 className="font-bold text-5xl pe-5 mb-5">
          We Help to get sollutions
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, vitae
          aut? Et repellat est optio, amet numquam labore beatae ipsum enim
          culpa cum excepturi veritatis, itaque consectetur blanditiis modi.
          Soluta. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
        <NavLink
          to="/health-tips"
          className="btn btn-primary mt-5 text-secondary"
        >
          Learn More
        </NavLink>
      </div>
      <div>
        <img
          src={DocPat}
          className="rounded-xl w-full h-[400px] object-cover"
          alt=""
        />
      </div>
    </div>
  );
};

export default AboutUs;
