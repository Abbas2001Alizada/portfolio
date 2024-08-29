import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useMatch, useNavigate } from "react-router-dom";
import CreateProject from "./createProject";
import DeleteProject from "./delete";
import Portfolio from "./portfolio";
import Messages from "./Message";

const AdminDashboard = () => {
  const token = sessionStorage.getItem("token");
  const [selectedOption, setSelectedOption] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const useLogout = () => {
    const logout = () => {
      navigate("/");
      sessionStorage.removeItem("token");
    };
    return logout;
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <div
      dir="ltr"
      className="min-h-screen flex flex-col bg-gradient-to-br from-red-900 via-red-700 to-red-400"
    >
      {/* Navbar */}
      <nav
        dir="rtl"
        className="bg-gray-950 text-white p-4 flex justify-between items-center text center"
      >
        <div>
          {" "}
          <button
            onClick={useLogout()}
            className=" mx-1 bg-white text-black rounded-lg px-2 m-1 hover:bg-red-500"
          >
            logout
          </button>          <button
            onClick=''
            className=" mx-1 bg-white text-black rounded-lg px-2 m-1 hover:bg-blue-500"
          >
            Edite cridential
          </button>
        </div>
        <div className="items center w-full">
          <p className="text-center italic font-bold animate-pulse opacity-0 duration-100 sm:text-xl md:text-2xl lg:text-4xl">
            My Porfolio
          </p>
        </div>
      </nav>

      <div className="flex flex-grow flex-col md:flex-row">
        {/* Hamburger Menu for Mobile */}
        <div className="bg-gray-950 text-white p-4 md:hidden flex justify-between items-center">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-xl font-bold"
          >
            ☰
          </button>
        </div>

        {/* Sidebar */}
        <aside
          className={`bg-gray-900 text-white l  p-4 transform ${
            sidebarOpen
              ? "translate-x-0 z-20"
              : "hidden md:flex lg:flex -translate-x-full"
          } hi md:translate-x-0 transition-transform duration-300 ease-in-out`}
        >
          <ul>
            <li
              className={`p-2 cursor-pointer ${
                selectedOption === "CreateAppointment" && "bg-gray-600"
              }`}
              onClick={() => setSelectedOption("UpdateResume")}
            >
              Update Resume{" "}
            </li>
            <li
              className={`p-2 cursor-pointer ${
                selectedOption === "CreateAccount" && "bg-gray-600"
              }`}
              onClick={() => setSelectedOption("AddProject")}
            >
              Add Project{" "}
            </li>
            <li
              className={`p-2 cursor-pointer mt-2 ${
                selectedOption === "DeleteAccount" && "bg-gray-600"
              }`}
              onClick={() => setSelectedOption("DeleteProject")}
            >
              Delete Project{" "}
            </li>
            <li
              className={`p-2 cursor-pointer ${
                selectedOption === "report" && "bg-gray-600"
              }`}
              onClick={() => setSelectedOption("Messages")}
            >
              Messages{" "}
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-grow bg-gray-100 p-4">
          {selectedOption === "AddProject" ? (
            <section className="dir-rtl">
              <CreateProject />
            </section>
          ) : selectedOption === "DeleteProject" ? (
            <section>
              <DeleteProject />
              <Portfolio />
            </section>
          ) : selectedOption === "UpdateResume" ? (
            <section></section>
          ) : selectedOption === "Messages" ? (
            <section>
              <Messages />
            </section>
          ) : selectedOption === "users" ? (
            <section></section>
          ) : (
            <section></section>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
