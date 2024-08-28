import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  return (
    <div className=" bg-[#F4F4F4] h-screen">
      <ul>
        <li className={location.pathname === "/" ? "bg-[#F4EDAF]" : ""}>
          <Link to="/">
            <div className="flex justify-between items-center font-semibold p-3">
              <img src="/Sidebar/home (3) 1.svg" alt="homeLogo" />
              <h1>Dashboard</h1>
              <img src="/Sidebar/Group 2609062.svg" alt="homeLogo" />
            </div>
          </Link>
        </li>
        <li className={location.pathname === "/category" ? "bg-[#F4EDAF]" : ""}>
          <Link to="/category">
            <div className="flex justify-between items-center font-semibold p-3">
              <img src="/Sidebar/Group.svg" alt="homeLogo" />
              <h1>Category</h1>
              <img src="/Sidebar/Group 2609062.svg" alt="homeLogo" />
            </div>
          </Link>
        </li>
        <li
          className={location.pathname === "/subcategory" ? "bg-[#F4EDAF]" : ""}
        >
          <Link to="/subcategory">
            <div className="flex justify-between items-center font-semibold p-3">
              <img src="/Sidebar/list 1.svg" alt="homeLogo" />
              <h1>Subcategory</h1>
              <img src="/Sidebar/Group 2609062.svg" alt="homeLogo" />
            </div>
          </Link>
        </li>
        <li className={location.pathname === "/products" ? "bg-[#F4EDAF]" : ""}>
          <Link to="/products">
            <div className="flex justify-between items-center font-semibold p-3">
              <img src="/Sidebar/Group 2609141.svg" alt="homeLogo" />
              <h1>Products</h1>
              <img src="/Sidebar/Group 2609062.svg" alt="homeLogo" />
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
