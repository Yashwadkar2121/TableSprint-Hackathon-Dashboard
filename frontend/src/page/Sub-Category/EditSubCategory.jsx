import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditSubCategory = () => {
  const { id } = useParams(); // Get the subcategory ID from the URL
  const [subcategoryName, setSubcategoryName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState("");
  const [sequence, setSequence] = useState("");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch available categories for the select input
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
        console.log(response.data); // Log the full response to verify the data
        const subcategory = response.data.data; // Adjust the path if needed
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedSubcategory = {
      subcategory_name: subcategoryName,
      category_id: categoryId,
      image: image,
      status: status,
      sequence: sequence,
    };

    try {
      await axios.put(
        `http://localhost:5000/subcategories/${id}`,
        updatedSubcategory
      );
      alert("Subcategory updated successfully.");
      navigate("/subcategories");
    } catch (err) {
      setError("Error updating subcategory."), err;
    }
  };

  if (!subcategoryName || !categoryId) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Subcategory</h2>
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
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.category_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="image" className="block text-sm font-medium">
            Image URL
          </label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
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
            Update Subcategory
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditSubCategory;
