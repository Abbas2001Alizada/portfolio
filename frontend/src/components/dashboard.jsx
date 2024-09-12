import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { FaBars } from "react-icons/fa";
import CreateProject from "./createProject";
import DeleteProject from "./delete";
import Portfolio from "./portfolio";
import Messages from "./Message";
import ResumeUpload from "./resumeUpload";
import { FaRegEdit } from "react-icons/fa";

const AdminDashboard = () => {
  const token = sessionStorage.getItem("token");
  const [selectedOption, setSelectedOption] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setDropdownOpen(false); // Close dropdown when an option is selected
  };
  const handleEdite = () => {
    navigate("/editeCridentials");
  };
  return (
    <div
      dir="ltr"
      className="min-h-screen flex flex-col bg-gradient-to-br from-red-900 via-red-700 to-red-400"
    >
      {/* Navbar */}
      <nav
        dir="rtl"
        className="bg-gray-950 text-white p-4 flex justify-between items-center"
      >
        <div className="flex items-center">
          {/* Hamburger Menu for Mobile */}
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="text-2xl font-bold md:hidden"
          >
            <FaBars />
          </button>

          <div className="flex md:grid">
            <button
              onClick={logout}
              className="rounded-full flex items-center mx-1 bg-white text-black px-2 m-1 hover:bg-red-500"
            > <BiLogOut  className="m-1" />
            </button>
            <button
              onClick={handleEdite}
              className="rounded-full mx-1 bg-white text-black px-2 m-1 hover:bg-blue-500"
            ><FaRegEdit className="m-1"/>
            </button>
          </div>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <p className="text-center italic font-bold animate-pulse text-white opacity-80 sm:text-xl md:text-2xl lg:text-4xl">
            My Portfolio
          </p>
        </div>
      </nav>

      {/* Dropdown Menu (Visible in Mobile Mode) */}
      {dropdownOpen && (
        <div className="bg-gray-900 text-white p-4 md:hidden">
          <ul>
            <li
              className={`p-2 cursor-pointer ${
                selectedOption === "UpdateResume" && "bg-gray-600"
              }`}
              onClick={() => handleOptionClick("UpdateResume")}
            >
              Update Resume
            </li>
            <li
              className={`p-2 cursor-pointer ${
                selectedOption === "AddProject" && "bg-gray-600"
              }`}
              onClick={() => handleOptionClick("AddProject")}
            >
              Add Project
            </li>
            <li
              className={`p-2 cursor-pointer ${
                selectedOption === "DeleteProject" && "bg-gray-600"
              }`}
              onClick={() => handleOptionClick("DeleteProject")}
            >
              Delete Project
            </li>
            <li
              className={`p-2 cursor-pointer ${
                selectedOption === "Messages" && "bg-gray-600"
              }`}
              onClick={() => handleOptionClick("Messages")}
            >
              Messages
            </li>
          </ul>
        </div>
      )}

      <div className="flex flex-grow flex-col md:flex-row">
        {/* Sidebar (Hidden on Mobile) */}
        <aside className="bg-gray-900 text-white p-4 hidden md:block md:w-64">
          <ul>
            <li
              className={`p-2 cursor-pointer ${
                selectedOption === "UpdateResume" && "bg-gray-600"
              }`}
              onClick={() => setSelectedOption("UpdateResume")}
            >
              Update Resume
            </li>
            <li
              className={`p-2 cursor-pointer ${
                selectedOption === "AddProject" && "bg-gray-600"
              }`}
              onClick={() => setSelectedOption("AddProject")}
            >
              Add Project
            </li>
            <li
              className={`p-2 cursor-pointer ${
                selectedOption === "DeleteProject" && "bg-gray-600"
              }`}
              onClick={() => setSelectedOption("DeleteProject")}
            >
              Delete Project
            </li>
            <li
              className={`p-2 cursor-pointer ${
                selectedOption === "Messages" && "bg-gray-600"
              }`}
              onClick={() => setSelectedOption("Messages")}
            >
              Messages
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-grow bg-gray-100 p-4">
          {selectedOption === "AddProject" && (
            <section dir="rtl">
              <CreateProject />
            </section>
          )}
          {selectedOption === "DeleteProject" && (
            <section>
              <DeleteProject />
              <Portfolio />
            </section>
          )}
          {selectedOption === "UpdateResume" && (
            <section>
              <ResumeUpload />
            </section>
          )}
          {selectedOption === "Messages" && (
            <section>
              <Messages />
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
