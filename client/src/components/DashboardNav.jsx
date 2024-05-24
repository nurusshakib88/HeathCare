import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useLogin } from "../context/LoginContext";
import Logout from "./Logout";

const DashboardNav = () => {
  const { isLoggedIn, user } = useLogin();
  return (
    <div className="navbar sticky top-0 z-40 h-[10vh] bg-base-100">
      <div className="navbar-start"></div>

      <div className="navbar-center">
        <NavLink to="/" className="text-2xl font-bold">
          shushastho<span className="text-primary">.</span>
        </NavLink>
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

export default DashboardNav;
