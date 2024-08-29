
import { Routes,BrowserRouter,Route } from "react-router-dom";
import Login from "./components/login";
import App from "./App";
import AdminDashboard from "./components/dashboard";

export const Routerss = () => {
  return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<App/>} />
            <Route path="/Login" element={<Login/>} />
            <Route path="/dashboard" element={<AdminDashboard/>} />
        </Routes>
      </BrowserRouter>
  );
};
