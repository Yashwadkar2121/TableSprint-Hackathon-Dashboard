import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = ({}) => {
  const [formData, setFormData] = useState({
    subcategory_id: "",
    product_name: "",
    status: "active",
    image: "",
  });

  const [error, setError] = useState(null);
  const [subcategories, setSubcategories] = useState([]); // State to hold subcategories
  const navigate = useNavigate();

  // Fetch available subcategories on component mount
  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/subcategories");
        setSubcategories(response.data); // Assuming the API returns an array of subcategories
      } catch (err) {
        setError("Error fetching subcategories.", err);
      }
    };

    fetchSubcategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/products",
        formData
      );
      response.data.data;
      setFormData({
        subcategory_id: "",
        product_name: "",
        status: "active",
        image: "",
      });
      navigate("/products");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add Product</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Subcategory Dropdown */}
        <div>
          <label
            htmlFor="subcategory_id"
            className="block text-sm font-medium text-gray-700"
          >
            Subcategory:
          </label>
          <select
            id="subcategory_id"
            name="subcategory_id"
            value={formData.subcategory_id}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="block text-sm font-medium text-gray-700"
          >
            Product Name:
          </label>
          <input
            type="text"
            id="product_name"
            name="product_name"
            value={formData.product_name}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Status */}
        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700"
          >
            Status:
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Image URL */}
        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Image URL:
          </label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
