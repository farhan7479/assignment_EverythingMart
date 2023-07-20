const express = require("express");
require("colors");
require("dotenv").config();
const morgan = require("morgan");
const connectDB = require("./config/db.js");
const orderRoutes = require('./routes/orderRoute.js');
const cors = require("cors");


// Configure database connection
connectDB();

const app = express();

// Middleware
app.use(cors());


app.use(express.json());
app.use(morgan("dev"));

// Routes

app.use('/api', orderRoutes);


// Default route
app.get("/", (req, res) => {
  res.send("<h1>Welcome to the EverythingMart app</h1>");
});

// Set the port
const PORT = process.env.PORT || 8080;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
});
