import React from "react";

const GetInTouch = () => {
  return (
    <div className="py-20">
      <div className="py-16 rounded-xl bg-primary text-secondary">
        <div className="px-[350px] text-center">
          <h1 className="text-[36px] font-bold mb-5">
            Get in touch to book your first appointment
          </h1>
          <p className="font-medium">
            Booking an appointment is quick and simples
          </p>

          <form className="flex gap-3 mt-10 justify-center">
            <input
              type="text"
              placeholder="Enter your name"
              className="input"
            />
            <input
              type="text"
              placeholder="Enter your name"
              className="input"
            />
            <button type="submit" className="btn ">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GetInTouch;
