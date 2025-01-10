import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch products from the API
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/products");
      setProducts(response.data.products); // Assuming the API returns an array of products
      setLoading(false);
    } catch (err) {
      setError("Error fetching products.");
      setLoading(false);
    }
  };

  // Handle delete product
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/products/${id}`);
      setProducts(products.filter((product) => product.id !== id));
      alert("Product deleted successfully.");
    } catch (err) {
      alert("Failed to delete product.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading)
    return <p className="text-center text-gray-600 mt-4">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500 mt-4">Error: {error}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Product Dashboard</h1>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <Link to="/add_product">Add Product</Link>
        </button>
      </div>
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white rounded-lg border border-gray-200">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left text-gray-700 font-semibold">
                ID
              </th>
              <th className="px-4 py-2 text-left text-gray-700 font-semibold">
                Name
              </th>
              <th className="px-4 py-2 text-left text-gray-700 font-semibold">
                Subcategory
              </th>
              <th className="px-4 py-2 text-left text-gray-700 font-semibold">
                Status
              </th>
              <th className="px-4 py-2 text-left text-gray-700 font-semibold">
                Image
              </th>
              <th className="px-4 py-2 text-left text-gray-700 font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-t border-gray-200 hover:bg-gray-100"
              >
                <td className="px-4 py-2 text-gray-600">{product.id}</td>
                <td className="px-4 py-2 text-gray-600">
                  {product.product_name}
                </td>
                <td className="px-4 py-2 text-gray-600">
                  {product.Subcategory?.subcategory_name || "N/A"}
                </td>
                <td className="px-4 py-2 text-gray-600">{product.status}</td>
                <td className="px-4 py-2">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.product_name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  ) : (
                    <span className="text-gray-500">No Image</span>
                  )}
                </td>
                <td className="px-4 py-2">
                  <Link to={`/edit_product/${product.id}`}>
                    <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-4 rounded mr-2">
                      Update
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id)}
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
    </div>
  );
};

export default Product;
