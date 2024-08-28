import { useState } from "react";
import axios from "axios";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/user/register", {
        email,
        password,
      });

      setSuccess(response.data.message);
      setError(""); // Clear any previous errors

      // Optionally, clear the form fields
      setEmail("");
      setPassword("");
    } catch (error) {
      setError(
        error.response?.data?.error || "An error occurred. Please try again."
      );
      setSuccess(""); // Clear any previous success message
    }
  };

  return (
    <div className="bg-[#5C218B] min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-[#5C218B]">
          Register
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && (
          <p className="text-green-500 text-center mb-4">{success}</p>
        )}

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-semibold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#5C218B]"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 font-semibold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#5C218B]"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#5C218B] text-white py-2 rounded-md hover:bg-[#4A1B6E] transition duration-300"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
