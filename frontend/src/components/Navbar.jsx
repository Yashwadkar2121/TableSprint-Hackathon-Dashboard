import { useState } from "react";
import { Link } from "react-router-dom";
import blockImg from "../assets/block_img.svg";
import UserImg from "../assets/user_logo.svg";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  return (
    <header className="bg-[#662671] text-white ">
      <nav className="flex justify-between items-center md:px-10 p-3 md:p-5">
        <div className="flex gap-2 md:gap-5 items-center">
          {/* Icon that toggles sidebar visibility */}
          <div className="md:hidden">
            {" "}
            <i
              className="fa-solid fa-bars text-2xl cursor-pointer "
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
        <div className="text-2xl flex justify-between items-center">
          <Link to="/login">
            <img
              src={UserImg}
              alt="User"
              className="h-8 w-8 md:h-auto md:w-auto"
            />
          </Link>
        </div>
      </nav>

      {/* Sidebar component */}
      {isSidebarVisible && <Sidebar toggleSidebar={toggleSidebar} />}
    </header>
  );
};

export default Navbar;
