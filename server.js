// ? Server Setup
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/api");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the API routes
app.use("/api", routes);

// Connect to the MongoDB database
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/social-network-api",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Enable mongoose debugging
mongoose.set("debug", true);

// Start the server
app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
