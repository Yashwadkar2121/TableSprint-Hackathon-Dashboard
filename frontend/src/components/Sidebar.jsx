function Sidebar() {
  return (
    <div className="p-8 bg-[#F4F4F4] h-[90vh]">
      <ul className="space-y-5">
        <li>
          <div className="flex justify-between items-center">
            <img src="/Sidebar/home (3) 1.svg" alt="homeLogo" />
            <h1>Dashboard</h1>
            <img src="/Sidebar/Group 2609062.svg" alt="homeLogo" />
          </div>
        </li>
        <li>
          <div className="flex justify-between items-center">
            <img src="/Sidebar/Group.svg" alt="homeLogo" />
            <h1>Category</h1>
            <img src="/Sidebar/Group 2609062.svg" alt="homeLogo" />
          </div>
        </li>
        <li>
          <div className="flex justify-between items-center">
            <img src="/Sidebar/list 1.svg" alt="homeLogo" />
            <h1>Subcategory</h1>
            <img src="/Sidebar/Group 2609062.svg" alt="homeLogo" />
          </div>
        </li>
        <li>
          <div className="flex justify-between items-center">
            <img src="/Sidebar/Group 2609141.svg" alt="homeLogo" />
            <h1>Products</h1>
            <img src="/Sidebar/Group 2609062.svg" alt="homeLogo" />
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
