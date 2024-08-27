import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DashBorad from "./DashBorad";
import Category from "./Category/Category";
import AddCategory from "./Category/AddCategory";
import EditCategory from "./Category/Category";
import SubCategory from "./Sub-Category/SubCategory";
import AddSubCategory from "./Sub-Category/AddSubCategory";
import EditSubCategory from "./Sub-Category/EditSubCategory";
import Product from "./Products/Products";
import AddProduct from "./Products/AddProducts";
import EditProduct from "./Products/EditProducts";

function Home() {
  return (
    <BrowserRouter>
      {" "}
      <Navbar />
      <div className="flex h-[90vh]">
        <div className="w-3/12">
          {" "}
          <Sidebar />{" "}
        </div>
        <div className="w-9/12">
          <Routes>
            <Route path="/" element={<DashBorad />} />
            <Route path="/category" element={<Category />} />
            <Route path="/addcategory" element={<AddCategory />} />
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
    </BrowserRouter>
  );
}

export default Home;
