import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditSubCategory = () => {
  const [subcategoryName, setSubcategoryName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState("active");
  const [sequence, setSequence] = useState("");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams(); // Get the subcategory ID from URL parameters

  // Fetch available categories for the dropdown
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/categories");
        setCategories(response.data.data);
      } catch (err) {
        setError("Error fetching categories.", err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch the subcategory details to edit
  useEffect(() => {
    const fetchSubcategory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/subcategories/${id}`
        );
        const subcategory = response.data.data;
        setSubcategoryName(subcategory.subcategory_name);
        setCategoryId(subcategory.category_id);
        setImage(subcategory.image);
        setStatus(subcategory.status);
        setSequence(subcategory.sequence);
      } catch (err) {
        setError("Error fetching subcategory details.", err);
      }
    };
    fetchSubcategory();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("subcategory_name", subcategoryName);
      formData.append("category_id", categoryId);
      formData.append("image", image); // Ensure this is a file object
      formData.append("status", status);
      formData.append("sequence", sequence);

      const response = await axios.put(
        `http://localhost:5000/subcategories/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200) {
        alert("Subcategory updated successfully.");
        navigate("/subcategory");
      }
    } catch (err) {
      setError("Error updating subcategory.", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Subcategory</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="subcategory_name"
            className="block text-lg font-medium"
          >
            Subcategory Name
          </label>
          <input
            type="text"
            id="subcategory_name"
            value={subcategoryName}
            onChange={(e) => setSubcategoryName(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>

        <div>
          <label htmlFor="category_id" className="block text-lg font-medium">
            Category
          </label>
          <select
            id="category_id"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.category_name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="image" className="block text-lg font-medium">
            Image
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
            {loading ? "Updating..." : "Update Subcategory"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditSubCategory;
