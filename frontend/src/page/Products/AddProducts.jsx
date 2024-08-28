import { useState, useEffect } from "react";
import axios from "axios";

const AddProducts = () => {
  const [formData, setFormData] = useState({
    name: "",
    categoryName: "",
    subCategoryName: "",
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // Fetch all categories
    axios
      .get("http://localhost:5000/category")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  useEffect(() => {
    // Fetch sub-categories when category is selected
    if (formData.categoryName) {
      axios
        .get(
          `http://localhost:5000/subcategory?category=${formData.categoryName}`
        )
        .then((response) => {
          setSubCategories(response.data);
        })
        .catch((error) => {
          console.error("Error fetching sub-categories:", error);
        });
    } else {
      setSubCategories([]);
    }
  }, [formData.categoryName]);

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
    data.append("subCategoryName", formData.subCategoryName);
    data.append("image", image);

    try {
      const response = await axios.post(
        "http://localhost:5000/products/create",
        data
      );
      setSuccess(response.data.message);
      setError("");
      // Reset form
      setFormData({ name: "", categoryName: "", subCategoryName: "" });
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
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="name"
          >
            Product Name
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
              <option key={category.name} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="subCategoryName"
          >
            Sub-Category Name
          </label>
          <select
            id="subCategoryName"
            name="subCategoryName"
            value={formData.subCategoryName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Select a Sub-Category</option>
            {subCategories.map((subCategory) => (
              <option key={subCategory.name} value={subCategory.name}>
                {subCategory.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="image"
          >
            Product Image
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

export default AddProducts;
