import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useLogin } from "../context/LoginContext";
import Logout from "./Logout";

const Navbar = () => {
  const { isLoggedIn, user } = useLogin();
  return (
    <div className="navbar sticky top-0 z-40 h-[10vh] bg-base-100 px-32">
      <div className="navbar-start">
        <NavLink to="/" className="text-2xl font-bold">
          shushastho<span className="text-primary">.</span>
        </NavLink>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-medium">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/make-an-appointment">Make An Appointment</NavLink>
          </li>
          <li>
            <NavLink to="/ambulance">Ambulance</NavLink>
          </li>
          <li>
            <NavLink to="/blood-bank">Blood Bank</NavLink>
          </li>
          <li>
            <NavLink to="/health-tips">Heath Tips</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
          <li>
            <NavLink to="/chat">Chat</NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {isLoggedIn && user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img src={user.imageUrl} alt="User avatar" />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 font-medium"
            >
              <li>
                <NavLink to="/profile" className="justify-between">
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/appointments" className="justify-between">
                  Appointment List
                </NavLink>
              </li>
              <li>
                <Logout />
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-3">
            <Link to="/login" className="btn btn-primary text-secondary">
              Login
            </Link>
            <Link to="/register" className="btn btn-primary text-secondary">
              Join Us
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
