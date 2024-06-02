import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../context/LoginContext";

const Logout = ({ className, icon }) => {
  const { setIsLoggedIn } = useLogin();

  const navigate = useNavigate();

  const handleLogout = () => {
    axios
      .get(`/api/logout`, { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        setIsLoggedIn(false);
        navigate("/login");
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  return (
    <Link className={className} onClick={handleLogout}>
      {icon}Logout
    </Link>
  );
};

export default Logout;
