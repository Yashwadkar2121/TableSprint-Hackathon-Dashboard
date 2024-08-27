const express = require("express");
const cors = require("cors"); // Import the cors package
const app = express();
const port = 5000;

const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const subCategoryRoutes = require("./routes/subCategory");
const productRoutes = require("./routes/product");

// Middleware to parse JSON bodies
app.use(express.json());

// Use CORS middleware
app.use(
  cors({
    origin: "*", // Allow requests from any origin (change to specific origins as needed)
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);

// Routes
app.use("/user", userRoutes);
app.use("/category", categoryRoutes);
app.use("/subcategory", subCategoryRoutes);
app.use("/products", productRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
