import axios from "axios";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useLogin } from "../context/LoginContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useLogin();

  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`/api/login`, { email, password })
      .then((res) => {
        if (res.data.Status === "Success") {
          localStorage.setItem("isLoggedIn", "true");
          setIsLoggedIn(true);
          if (res.data.role === "admin") {
            navigate("/dashboard");
          } else {
            navigate("/");
          }
        } else {
          return console.log("Incorrect email/pass");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="px-32 py-10 h-[90vh] flex items-center justify-center text-center">
      <form
        className="flex flex-col px-5 py-8 w-[60%] rounded-xl gap-3"
        onSubmit={handleSubmit}
        style={{ boxShadow: "0 1px 10px rgb(0,0,0,.3)" }}
      >
        <h1 className="font-bold mb-5 text-xl">Login</h1>
        <input
          type="email"
          placeholder="email"
          value={email}
          className="input input-bordered"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          className="input input-bordered"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn-primary text-secondary">Login</button>
        <p>
          Don't have an account?{" "}
          <Link to="/register" className="text-primary underline">
            Signup
          </Link>{" "}
          Instead
        </p>
      </form>
    </div>
  );
};

export default Login;
