import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [subcategoriesId, setSubcategoriesId] = useState("");
  const [productName, setProductName] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState("active");
  const [error, setError] = useState(null);
  const [subcategories, setSubCategories] = useState([]);
  const navigate = useNavigate();

  // Fetch available subcategories on component mount
  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/subcategories");
        setSubCategories(response.data); // Assuming the API returns an array of subcategories
      } catch (err) {
        setError("Error fetching subcategories.", err);
      }
    };

    fetchSubcategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("product_name", productName);
    formData.append("subcategory_id", subcategoriesId);
    formData.append("image", image); // Append the file
    formData.append("status", status);

    try {
      await axios.post("http://localhost:5000/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/products");
    } catch (err) {
      setError("Error adding product.", err);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-6">Add Product</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Subcategory Dropdown */}
        <div>
          <label
            htmlFor="subcategory_id"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Select Subcategory
          </label>
          <select
            id="subcategory_id"
            name="subcategory_id"
            value={subcategoriesId}
            onChange={(e) => setSubcategoriesId(e.target.value)}
            required
            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="" disabled>
              Select a subcategory
            </option>
            {subcategories.length === 0 ? (
              <option value="" disabled>
                No subcategories available
              </option>
            ) : (
              subcategories.map((subcategory) => (
                <option key={subcategory.id} value={subcategory.id}>
                  {subcategory.subcategory_name}
                </option>
              ))
            )}
          </select>
        </div>

        {/* Product Name */}
        <div>
          <label
            htmlFor="product_name"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Product Name
          </label>
          <input
            type="text"
            id="product_name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Status */}
        <div>
          <label
            htmlFor="status"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Product Status
          </label>
          <select
            id="status"
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Image Upload */}
        <div>
          <label htmlFor="image" className="block text-sm font-medium">
            Image URL
          </label>
          <input
            type="file"
            id="image"
            onChange={(e) => setImage(e.target.files[0])} // Store the selected file
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
