import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditCategory = () => {
  const [category_name, setCategoryName] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState("active");
  const [sequence, setSequence] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams(); // Get the category ID from URL parameters

  // Use environment variable or fallback to localhost
  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  // Fetch the category details by ID
  const fetchCategory = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/categories/${id}`);
      const category = response.data.data;
      setCategoryName(category.category_name);
      setImage(category.image);
      setStatus(category.status);
      setSequence(category.sequence);
    } catch (err) {
      setError("Error fetching category details", err);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("category_name", category_name);
      formData.append("image", image); // Ensure this is a file object
      formData.append("status", status);
      formData.append("sequence", sequence);

      const response = await axios.put(
        `${API_BASE_URL}/categories/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200) {
        navigate("/category");
      }
    } catch (err) {
      setError("Error updating category", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Category</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="category_name" className="block text-lg font-medium">
            Category Name
          </label>
          <input
            type="text"
            id="category_name"
            value={category_name}
            onChange={(e) => setCategoryName(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>

        <div>
          <label htmlFor="image" className="block text-lg font-medium">
            Image File
          </label>
          <input
            type="file"
            id="image"
            onChange={(e) => setImage(e.target.files[0])} // Handle file upload
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>

        <div>
          <label htmlFor="status" className="block text-lg font-medium">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div>
          <label htmlFor="sequence" className="block text-lg font-medium">
            Sequence
          </label>
          <input
            type="number"
            id="sequence"
            value={sequence}
            onChange={(e) => setSequence(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>

        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded mt-4 w-full"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Category"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCategory;
