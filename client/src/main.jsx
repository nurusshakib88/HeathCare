import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { LoginProvider } from "./context/LoginContext.jsx";
import { DoctorProvider } from "./context/DoctorContext.jsx";
import { AppointmentProvider } from "./context/AppointmentContext.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LoginProvider>
      <DoctorProvider>
        <AppointmentProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AppointmentProvider>
      </DoctorProvider>
    </LoginProvider>
  </React.StrictMode>
);
