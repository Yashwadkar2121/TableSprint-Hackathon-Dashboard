import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import AddCategory from "./Category/AddCategory";
// import DashBorad from "./DashBorad";

function Home() {
  return (
    <div>
      <Navbar />
      <div className="flex h-[80vh]">
        <div className="w-3/12">
          {" "}
          <Sidebar />
        </div>
        <div className="w-9/12 flex justify-center items-center m-2 border-2 h-[88vh] rounded-2xl">
          {/* <DashBorad /> */}
          <AddCategory />
        </div>
      </div>
    </div>
  );
}

export default Home;
