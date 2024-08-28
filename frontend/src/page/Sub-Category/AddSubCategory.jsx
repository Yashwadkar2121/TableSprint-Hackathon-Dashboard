import { useState, useEffect } from "react";
import axios from "axios";

const AddSubCategory = () => {
  const [formData, setFormData] = useState({
    name: "",
    categoryName: "",
    sequence: "",
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories for the dropdown
    axios
      .get("http://localhost:5000/category")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file)); // Preview the image
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("categoryName", formData.categoryName);
    data.append("sequence", formData.sequence);
    data.append("image", image);

    try {
      const response = await axios.post(
        "http://localhost:5000/subcategory/create",
        data
      );
      setSuccess(response.data.message);
      setError("");
      // Reset form
      setFormData({ name: "", categoryName: "", sequence: "" });
      setImage(null);
      setImagePreview(null);
    } catch (err) {
      setError(
        err.response?.data?.error || "An error occurred. Please try again."
      );
      setSuccess("");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add Sub-Category</h2>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="name"
          >
            Sub-Category Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="categoryName"
          >
            Category Name
          </label>
          <select
            id="categoryName"
            name="categoryName"
            value={formData.categoryName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Select a Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="sequence"
          >
            Sequence
          </label>
          <input
            type="text"
            id="sequence"
            name="sequence"
            value={formData.sequence}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="image"
          >
            Sub-Category Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            required
            className="w-full border rounded-md"
          />
          {imagePreview && (
            <div className="mt-2">
              <img
                src={imagePreview}
                alt="Image Preview"
                className="max-w-xs rounded-md"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default AddSubCategory;
