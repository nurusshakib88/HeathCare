import React from "react";

const Contact = () => {
  return (
    <div className="grid grid-cols-2 gap-10 items-center min-h-[77vh] px-32">
      <h1 className="text-6xl font-bold">
        Don't Hesitate to ask Any Questions
      </h1>
      <div
        className="card w-full mt-5"
        style={{ boxShadow: "0 1px 10px rgb(0,0,0,.3)" }}
      >
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold mb-4">Contact Us</h2>
          <form>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Your Name"
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Your Email"
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Message</span>
              </label>
              <textarea
                placeholder="Your Message"
                className="textarea textarea-bordered w-full resize-none"
                rows="3"
              ></textarea>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Send Message</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
