import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const BloodBank = () => {
  return (
    <div className="flex">
      <aside className="w-1/4 bg-gray-100 p-4">
        <ul className="menu">
          <li>
            <NavLink to="inventory" className={({ isActive }) => isActive ? 'text-primary' : ''}>Blood Inventory</NavLink>
          </li>
          <li>
            <NavLink to="donors" className={({ isActive }) => isActive ? 'text-primary' : ''}>Donor List</NavLink>
          </li>
          <li>
            <NavLink to="requests" className={({ isActive }) => isActive ? 'text-primary' : ''}>Blood Requests</NavLink>
          </li>
        </ul>
      </aside>
      <main className="w-3/4 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default BloodBank;
