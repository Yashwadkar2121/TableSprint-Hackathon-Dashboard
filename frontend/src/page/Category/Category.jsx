import { useState, useEffect } from "react";
import axios from "axios";

function Category() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/category");
        setCategories(response.data);
        setLoading(false);
      } catch (error) {
        setError(
          error.response?.data?.error || "An error occurred. Please try again."
        );
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-[#5C218B] min-h-screen flex flex-col items-center justify-center p-4">
      <h2 className="text-2xl font-bold mb-6 text-white">Categories</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        {categories.length > 0 ? (
          <ul>
            {categories.map((category) => (
              <li key={category.id} className="mb-4">
                <p className="text-lg font-semibold">{category.name}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-700">No categories available.</p>
        )}
      </div>
    </div>
  );
}

export default Category;
