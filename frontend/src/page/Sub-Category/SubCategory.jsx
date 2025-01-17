import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SubCategory = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch subcategories from the API
  const fetchSubcategories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/subcategories");
      setSubcategories(response.data); // Assuming the API returns an array of subcategories
      setLoading(false);
    } catch (err) {
      setError("Error fetching subcategories", err);
      setLoading(false);
    }
  };

  // Handle delete subcategory
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/subcategories/${id}`);
      setSubcategories(
        subcategories.filter((subcategory) => subcategory.id !== id)
      );
      alert("Subcategory deleted successfully.");
    } catch (err) {
      alert("Failed to delete subcategory.", err);
    }
  };

  useEffect(() => {
    fetchSubcategories();
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
        <h2 className="text-2xl font-bold mb-4">Subcategories</h2>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <Link to="/add_subcategory">Add SubCategory</Link>
        </button>
      </div>
      <table className="min-w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border-b px-4 py-2 text-left">Subcategory</th>
            <th className="border-b px-4 py-2 text-left">Category</th>
            <th className="border-b px-4 py-2 text-left">Image</th>
            <th className="border-b px-4 py-2 text-left">Status</th>
            <th className="border-b px-4 py-2 text-left">Sequence</th>
            <th className="border-b px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {subcategories.map((subcategory) => (
            <tr key={subcategory.id}>
              <td className="border-b px-4 py-2">
                {subcategory.subcategory_name}
              </td>
              <td className="border-b px-4 py-2">
                {subcategory.Category?.category_name}
              </td>
              <td className="border-b px-4 py-2">
                {subcategory.image ? (
                  <img
                    src={`http://localhost:5000/uploads/${subcategory.image}`}
                    alt={subcategory.category_name}
                    className="w-8 h-8"
                  />
                ) : (
                  "No Image"
                )}
              </td>
              <td className="border-b px-4 py-2">{subcategory.status}</td>
              <td className="border-b px-4 py-2">{subcategory.sequence}</td>
              <td className="border-b px-4 py-2">
                <Link to={`/edit_subcategory/${subcategory.id}`}>
                  <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-4 rounded">
                    Update
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(subcategory.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
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

export default SubCategory;
