import { useState } from "react";
import axios from "axios";

const AddCategory = () => {
  const [formData, setFormData] = useState({
    name: "",
    sequence: "",
  });
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("sequence", formData.sequence);
    if (image) data.append("image", image);

    try {
      const response = await axios.post(
        "http://localhost:5000/category/create",
        data
      );
      setSuccess(response.data.message);
      setError(""); // Clear any previous errors

      // Optionally, clear the form fields
      setFormData({
        name: "",
        sequence: "",
      });
      setImage(null);
    } catch (error) {
      setError(
        error.response?.data?.error || "An error occurred. Please try again."
      );
      setSuccess(""); // Clear any previous success message
    }
  };

  return (
    <div>
      <div className="flex gap-5">
        <button>--</button>
        <h2 className="font-semibold">Add Category</h2>
      </div>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="flex justify-between my-10">
          <label>
            Category Name
            <br />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="border-2 border-black rounded-full"
            />
          </label>
          <label>
            Category Sequence
            <br />
            <input
              type="text"
              name="sequence"
              value={formData.sequence}
              onChange={handleChange}
              required
              className="border-2 border-black rounded-full"
            />
          </label>
        </div>

        <label>
          Category Image
          <br />
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            required
          />
        </label>
        <div className="absolute bottom-5 right-5">
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-10"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-10"
          >
            Save
          </button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
      </form>
    </div>
  );
};

export default AddCategory;
