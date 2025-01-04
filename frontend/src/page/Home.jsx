import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Dashboard from "./Dashboard";
import Category from "./Category/Category";
import AddCategory from "./Category/AddCategory";
import EditCategory from "./Category/Category";
import SubCategory from "./Sub-Category/SubCategory";
import AddSubCategory from "./Sub-Category/AddSubCategory";
import EditSubCategory from "./Sub-Category/EditSubCategory";
import Product from "./Products/Products";
import AddProduct from "./Products/AddProducts";
import EditProduct from "./Products/EditProducts";
import Login from "../components/Login";
import Register from "../components/Register";

function AppContent() {
  const location = useLocation();
  const isAuthRoute =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <div>
      <div className="sticky top-0 left-0 z-10">
        <Navbar />
      </div>
      {!isAuthRoute && (
        <div className="flex h-screen">
          <div className="hidden md:block md:w-4/12 lg:w-3/12">
            <Sidebar />
          </div>
          <div className="w-full md:w-8/12 lg:w-9/12 m-3">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/category" element={<Category />} />
              <Route path="/add_category" element={<AddCategory />} />
              <Route path="/editcategory" element={<EditCategory />} />
              <Route path="/subcategory" element={<SubCategory />} />
              <Route path="/addsubcategory" element={<AddSubCategory />} />
              <Route path="/editsubcategory" element={<EditSubCategory />} />
              <Route path="/products" element={<Product />} />
              <Route path="/addproduct" element={<AddProduct />} />
              <Route path="/editproduct" element={<EditProduct />} />
            </Routes>
          </div>
        </div>
      )}
      {isAuthRoute && (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      )}
    </div>
  );
}

function Home() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default Home;
