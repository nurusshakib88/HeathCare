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
      try {
        const response = await axios.get("http://localhost:3001/me", {
          withCredentials: true,
        });
        setUser(response.data.user);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user:", error);
        setError(
          error.response ? error.response.data.message : "An error occurred"
        );
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchedToken = document.cookie;

    if (fetchedToken) {
      // Token found, set isLoggedIn to true
      localStorage.setItem("isLoggedIn", true);
      setIsLoggedIn(true);
    } else {
      // Token not found or invalid, set isLoggedIn to false
      localStorage.setItem("isLoggedIn", false);
      setIsLoggedIn(false);
    }
  }, [isLoggedIn]);

  return (
    <LoginContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, user, loading, error }}
    >
      {children}
    </LoginContext.Provider>
  );
};
