import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  

  // Fetch categories from the API
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/categories");
      setCategories(response.data.data);
      setLoading(false);
    } catch (err) {
      setError("Error fetching categories", err);
      setLoading(false);
    }
  };

  
  // Handle category deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/categories/${id}`);
      // Refresh the category list after deletion
      fetchCategories();
    } catch (err) {
      setError("Error deleting category", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Categories</h2>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <Link to="/add_category">Add Category</Link>
        </button>
      </div>

      <table className="min-w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border-b px-4 py-2 text-left">Category</th>
            <th className="border-b px-4 py-2 text-left">Image</th>
            <th className="border-b px-4 py-2 text-left">Sequence</th>
            <th className="border-b px-4 py-2 text-left">Status</th>
            <th className="border-b px-4 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td className="border-b px-4 py-2">{category.category_name}</td>
              <td className="border-b px-4 py-2">
                <img
                  src={category.image}
                  alt={category.category_name}
                  className="w-8 h-8"
                />
              </td>
              <td className="border-b px-4 py-2">{category.sequence}</td>
              <td className="border-b px-4 py-2">{category.status}</td>
              <td className="border-b px-4 py-2 flex space-x-2">
                {/* Update Button */}
                <Link to={`/edit_category/${category.id}`}>
                  <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-4 rounded">
                    Update
                  </button>
                </Link>
                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(category.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Category;
