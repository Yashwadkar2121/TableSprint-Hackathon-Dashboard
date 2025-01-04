const express = require("express");
const bodyParser = require("body-parser");
const { sequelize } = require("./models");
const userRoutes = require("./routes/user");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
// Use CORS middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from any origin (change to specific origins as needed)
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);
// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use("/auth", userRoutes);

// Sync database and start server
sequelize.sync({ force: false }).then(() => {
  console.log("Database synced");
  app.listen(5000, () =>
    console.log("Server running on http://localhost:5000")
  );
});
