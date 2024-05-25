import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const LoginContext = createContext();

export const useLogin = () => useContext(LoginContext);

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (isLoggedIn) {
        setLoading(true);
        try {
          const response = await axios.get(`/api/me`, {
            withCredentials: true,
          });
          setUser(response.data.user);
          setError(null); // Clear previous errors
        } catch (error) {
          console.error("Error fetching user:", error);
          setError(
            error.response ? error.response.data.message : "An error occurred"
          );
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUser();
  }, [isLoggedIn]);

  useEffect(() => {
    const checkToken = () => {
      const fetchedToken = document.cookie.includes("token");

      if (fetchedToken) {
        localStorage.setItem("isLoggedIn", "true");
        setIsLoggedIn(true);
      } else {
        localStorage.setItem("isLoggedIn", "false");
        setIsLoggedIn(false);
        setUser(null); // Clear user data when not logged in
      }
    };

    checkToken();
  }, []);

  return (
    <LoginContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, user, loading, error }}
    >
      {children}
    </LoginContext.Provider>
  );
};
