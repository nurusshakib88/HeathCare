import { Navigate, Outlet } from "react-router-dom";
import { useLogin } from "../context/LoginContext";

export const ProtectedRoute = () => {
  const { isLoggedIn } = useLogin();

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};
