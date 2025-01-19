import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditProduct = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [productName, setProductName] = useState("");
  const [subcategoryId, setSubcategoryId] = useState("");
  const [image, setImage] = useState(null); // Change to handle file upload
  const [status, setStatus] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Use environment variable for API base URL or fallback to localhost
  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  // Fetch available subcategories for the select input
  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/subcategories`);
        setSubcategories(response.data);
      } catch (err) {
        setError("Error fetching subcategories.", err);
      }
    };
    fetchSubcategories();
  }, []);

  // Fetch the product details to edit
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/products/${id}`);
        const product = response.data.product; // Adjust path if needed
        setProductName(product.product_name);
        setSubcategoryId(product.subcategory_id);
        setStatus(product.status);
        setImage(product.image); // Pre-fill with existing image URL (not for upload)
      } catch (err) {
        setError("Error fetching product details.", err);
      }
    };
    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProduct = new FormData();
    updatedProduct.append("product_name", productName);
    updatedProduct.append("subcategory_id", subcategoryId);
    updatedProduct.append("status", status);

    // If a new image is uploaded, append it to the FormData
    if (image) {
      updatedProduct.append("image", image);
    }

    try {
      await axios.put(`${API_BASE_URL}/products/${id}`, updatedProduct, {
        headers: {
          "Content-Type": "multipart/form-data", // Important for file upload
        },
      });
      alert("Product updated successfully.");
      navigate("/products");
    } catch (err) {
      setError("Error updating product.", err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
        encType="multipart/form-data"
      >
        <div>
          <label htmlFor="product_name" className="block text-sm font-medium">
            Product Name
          </label>
          <input
            type="text"
            id="product_name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="subcategory_id" className="block text-sm font-medium">
            Subcategory
          </label>
          <select
            id="subcategory_id"
            value={subcategoryId}
            onChange={(e) => setSubcategoryId(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            {subcategories.map((subcategory) => (
              <option key={subcategory.id} value={subcategory.id}>
                {subcategory.subcategory_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="image" className="block text-sm font-medium">
            Image
          </label>
          <input
            type="file"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          {image && (
            <div className="mt-2">
              <p className="text-sm text-gray-600">
                Selected image: {image.name}
              </p>
            </div>
          )}
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
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
