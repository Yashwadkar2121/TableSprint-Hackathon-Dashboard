import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import blockImg from "../assets/block_img.svg";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const logout = () => {
    localStorage.removeItem("authToken"); // Remove the authentication token
    navigate("/login"); // Redirect to login page
  };

  // Check if the user is authenticated based on the presence of the token in localStorage
  const isAuthenticated = !!localStorage.getItem("authToken"); // True if token exists

  return (
    <header className="bg-[#662671] text-white ">
      <nav className="flex justify-between items-center md:px-10 p-3 md:p-5">
        <div className="flex gap-2 md:gap-5 items-center">
          <div className="md:hidden">
            <i
              className="fa-solid fa-bars text-2xl cursor-pointer"
              onClick={toggleSidebar}
            ></i>
          </div>

          <img
            src={blockImg}
            alt="logo"
            className="hidden md:block md:h-8 md:w-8 lg:h-10 lg:w-10"
          />
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
            TableSprint
          </h1>
        </div>
        <div className="text-2xl flex justify-between items-center gap-1 md:gap-2">
          {isAuthenticated ? (
            <button onClick={logout}>Logout</button>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">SignUp</Link>
            </>
          )}
        </div>
      </nav>

      {isSidebarVisible && <Sidebar toggleSidebar={toggleSidebar} />}
    </header>
  );
};

export default Navbar;
