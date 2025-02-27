import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddSubCategory = () => {
  const [subcategoryName, setSubcategoryName] = useState("");
  const [categoryId, setCategoryId] = useState(""); // Track selected category
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState("");
  const [sequence, setSequence] = useState("");
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]); // State to hold categories
  const navigate = useNavigate();

  // Use environment variable for API base URL or fallback to localhost
  const API_BASE_URL = import.meta.env.Vite_BASE_URL || "http://localhost:5000";

  // Fetch available categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/categories`);
        setCategories(response.data.data); // Assuming the API returns an array of categories
      } catch (err) {
        setError("Error fetching categories.", err);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("subcategory_name", subcategoryName);
    formData.append("category_id", categoryId);
    formData.append("image", image); // Append the file
    formData.append("status", status);
    formData.append("sequence", sequence);

    try {
      await axios.post(`${API_BASE_URL}/subcategories`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/subcategory");
    } catch (err) {
      setError("Error adding subcategory.", err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add Subcategory</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="subcategory_name"
            className="block text-sm font-medium"
          >
            Subcategory Name
          </label>
          <input
            type="text"
            id="subcategory_name"
            value={subcategoryName}
            onChange={(e) => setSubcategoryName(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="category_id" className="block text-sm font-medium">
            Category
          </label>
          <select
            id="category_id"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.length === 0 ? (
              <option value="" disabled>
                No categories available
              </option>
            ) : (
              categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.category_name}
                </option>
              ))
            )}
          </select>
        </div>

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
        <div>
          <label htmlFor="status" className="block text-sm font-medium">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div>
          <label htmlFor="sequence" className="block text-sm font-medium">
            Sequence
          </label>
          <input
            type="number"
            id="sequence"
            value={sequence}
            onChange={(e) => setSequence(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Subcategory
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSubCategory;
