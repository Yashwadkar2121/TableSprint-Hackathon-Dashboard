import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/user/login", {
        email,
        password,
      });

      const { token } = response.data;
      localStorage.setItem("authToken", token);

      setError(""); // Clear any previous errors
      navigate("/"); // Redirect to the dashboard or another page
    } catch (error) {
      setError(
        error.response?.data?.error || "An error occurred. Please try again."
      );
    }
  };

  return (
    <div className="bg-[#5C218B] min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-[#5C218B]">
          Login
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

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
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
