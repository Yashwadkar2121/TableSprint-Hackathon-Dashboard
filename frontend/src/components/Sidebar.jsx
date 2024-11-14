import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  return (
    <div className="bg-[#F4F4F4] h-screen flex items-center justify-center md:justify-start md:items-start ">
      <ul className="space-y-4 md:space-y-0 w-full">
        {" "}
        {/* Added space between list items */}
        <li className={location.pathname === "/" ? "md:bg-[#F4EDAF]" : ""}>
          <Link to="/">
            <div className="flex justify-center gap-2 md:justify-between items-center font-semibold md:pl-10 p-3">
              <img
                src="/Sidebar/home (3) 1.svg"
                alt="homeLogo"
                className="h-6 w-6 md:h-10 md:w-10"
              />
              <h1 className="text-xl md:text-base text-black">Dashboard</h1>
              <img
                src="/Sidebar/Group 2609062.svg"
                alt="homeLogo"
                className="h-6 w-6 hidden md:block"
              />
            </div>
          </Link>
        </li>
        <li
          className={location.pathname === "/category" ? "md:bg-[#F4EDAF]" : ""}
        >
          <Link to="/category">
            <div className="flex justify-center gap-2 md:justify-between items-center font-semibold md:pl-10 p-3">
              <img
                src="/Sidebar/Group.svg"
                alt="homeLogo"
                className="h-6 w-6 md:h-10 md:w-10 "
              />
              <h1 className="text-xl md:text-base text-black">Category</h1>
              <img
                src="/Sidebar/Group 2609062.svg"
                alt="homeLogo"
                className="h-6 w-6 hidden md:block"
              />
            </div>
          </Link>
        </li>
        <li
          className={
            location.pathname === "/subcategory" ? "md:bg-[#F4EDAF]" : ""
          }
        >
          <Link to="/subcategory">
            <div className="flex justify-center gap-2 md:justify-between items-center font-semibold md:pl-10 p-3">
              <img
                src="/Sidebar/list 1.svg"
                alt="homeLogo"
                className="h-6 w-6 md:h-10 md:w-10 "
              />
              <h1 className="text-xl md:text-base text-black">Subcategory</h1>
              <img
                src="/Sidebar/Group 2609062.svg"
                alt="homeLogo"
                className="h-6 w-6 hidden md:block"
              />
            </div>
          </Link>
        </li>
        <li
          className={location.pathname === "/products" ? "md:bg-[#F4EDAF]" : ""}
        >
          <Link to="/products">
            <div className="flex justify-center gap-2 md:justify-between items-center font-semibold md:pl-10 p-3">
              <img
                src="/Sidebar/Group 2609141.svg"
                alt="homeLogo"
                className="h-6 w-6 md:h-10 md:w-10 "
              />
              <h1 className="text-xl md:text-base text-black">Products</h1>
              <img
                src="/Sidebar/Group 2609062.svg"
                alt="homeLogo"
                className="h-6 w-6 hidden md:block"
              />
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
