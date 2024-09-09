import { Routes, BrowserRouter, Route } from "react-router-dom";
import Login from "./components/login";
import App from "./App";
import AdminDashboard from "./components/dashboard";
import ForgotPassword from "./components/forgotPassword";
import ResetPassword from "./components/resetPassword";
import UpdateCredentials from "./components/update cridential";

export const Routerss = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/editeCridentials" element={<UpdateCredentials/>}/>
      </Routes>
    </BrowserRouter>
  );
};
