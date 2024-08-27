import blockImg from "../assets/block_img.svg";
import UserImg from "../assets/iconoir_profile-circle.svg";
// import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="bg-[#662671] text-white p-2">
      <nav className="flex justify-between items-center px-10">
        <div className="flex gap-5 items-center">
          <img src={blockImg} alt="logo" />
          <h1 className="text-2xl font-bold">TableSprint</h1>
        </div>
        <div className="text-2xl">
          <a href="#">
            <img src={UserImg} alt="User" />
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
