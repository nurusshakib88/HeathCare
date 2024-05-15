import React from "react";
import { NavLink } from "react-router-dom";

const Error = () => {
  return (
    <div className="h-[90vh] px-32 py-10 items-center justify-center flex flex-col">
      <h1 className="text-6xl font-bold mb-2 uppercase">Error 404</h1>
      <p className="mb-4">Page not Found</p>
      <p>
        Go Back to{" "}
        <NavLink to="/" className="underline text-primary">
          Home
        </NavLink>
      </p>
    </div>
  );
};

export default Error;
