const express = require("express");
const app = express();
const port = 5000;

const userRoutes = require("./routes/user");

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use("/user", userRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
