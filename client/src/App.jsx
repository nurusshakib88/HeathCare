import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

import { ProtectedRoute } from "./protected/ProtectedRoutes";
import UserProfile from "./pages/UserProfile";
import { useLogin } from "./context/LoginContext";
import Navbar from "./components/Navbar";
import MakeAnAppointment from "./pages/MakeAnAppointment";
import AppointmentList from "./components/ApploinmentList";
import Error from "./pages/Error";
import Footer from "./components/Footer";

const App = () => {
  const { isLoggedIn } = useLogin();

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/make-an-appointment" element={<MakeAnAppointment />} />
        <Route element={<ProtectedRoute />}>
          {isLoggedIn && <Route path="/dashboard" element={<Dashboard />} />}
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/appointments" element={<AppointmentList />} />
        </Route>
        <Route path="/register" element={<Signup />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
