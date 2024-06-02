import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Chatbot from "./pages/Chatbot";

import { ProtectedRoute } from "./protected/ProtectedRoutes";
import UserProfile from "./pages/UserProfile";
import { useLogin } from "./context/LoginContext";
import Navbar from "./components/Navbar";
import MakeAnAppointment from "./pages/MakeAnAppointment";
import AppointmentList from "./components/ApploinmentList";
import Error from "./pages/Error";
import Footer from "./components/Footer";
import BloodBank from "./pages/BloodBank";
import BloodInventory from "./pages/BloodInventory";
import BloodDonorList from "./pages/BloodDonorList";
import BloodRequest from "./pages/BloodRequest";
import Ambulance from "./pages/Ambulance";
import { useEffect } from "react";
import Contact from "./pages/Contact";
import HealthTips from "./pages/HealthTips";

const App = () => {
  const { isLoggedIn } = useLogin();
  const location = useLocation();

  // Check if the current path is "/dashboard"
  const isDashboard = location.pathname === "/dashboard";
  const isBloodBank = location.pathname === "/blood-bank";

  const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  };

  return (
    <>
      <ScrollToTop />
      {!isDashboard && !isBloodBank && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Chatbot />} />
        <Route path="/health-tips" element={<HealthTips />} />
        <Route path="/" element={<Home />} />
        <Route path="/ambulance" element={<Ambulance></Ambulance>} />
        <Route path="/make-an-appointment" element={<MakeAnAppointment />} />
        <Route element={<ProtectedRoute />}>
          {isLoggedIn && <Route path="/dashboard" element={<Dashboard />} />}
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/appointments" element={<AppointmentList />} />
        </Route>
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Signup />} />
        <Route path="*" element={<Error />} />
        <Route path="/Blood" element={<BloodInventory />} />

        <Route path="/blood-bank" element={<BloodBank />}>
          <Route path="inventory" element={<BloodInventory />} />
          <Route path="donors" element={<BloodDonorList />} />
          <Route path="requests" element={<BloodRequest />} />
        </Route>
      </Routes>
      {!isDashboard && !isBloodBank && <Footer />}
    </>
  );
};

export default App;
