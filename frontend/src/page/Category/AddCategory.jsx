import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const [category_name, setCategoryName] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState("active");
  const [sequence, setSequence] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/categories", {
        category_name,
        image,
        status,
        sequence,
      });

      if (response.status === 201) {
        // Redirect to categories list after successful category creation
        navigate("/category");
      }
    } catch (err) {
      setError("Error creating category", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add New Category</h2>
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
            Image URL
          </label>
          <input
            type="url"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
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
            {loading ? "Creating..." : "Create Category"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
