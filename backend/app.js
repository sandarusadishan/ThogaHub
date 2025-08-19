import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import cors from "cors";
import dotenv from "dotenv";

// Import your route handlers
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";
import messagingRouter from "./routes/messagingRouter.js";
import setupRouter from "./routes/setupRouter.js";

// Load environment variables from .env file
dotenv.config();

// Initialize the Express application
const app = express();

// Use the MONGO_URI from environment variables for database connection
const mongoUrl = process.env.MONGO_URI;

// Connect to MongoDB Atlas
// The .then() and .catch() approach is a modern way to handle promises
mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
    // You can handle the error more gracefully here, e.g., exit the application
    process.exit(1); 
  });

// Middleware section
// These are functions that run on every request to the server

// Enable Cross-Origin Resource Sharing (CORS)
// This allows your frontend to make requests to this server
app.use(cors());

// Parse incoming request bodies in JSON format
// express.json() is the modern equivalent of bodyParser.json()
app.use(express.json());

// Custom middleware for JWT authentication
// This middleware runs on every request to check for a valid JWT token
app.use((req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader ? authHeader.replace("Bearer ", "") : null;
  
  if (token) {
    try {
      // Verify the token using the secret key from environment variables
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Attach the decoded user payload to the request object
      req.user = decoded;
    } catch (error) {
      console.log('Invalid Token:', error.message);
    }
  }
  // Continue to the next middleware or route handler
  next();
});

// Routes section
// Define the API endpoints using the imported routers
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/messages", messagingRouter);
app.use("/api/setup", setupRouter);

// Set the port for the server to listen on
// It uses the port from environment variables or defaults to 5000
const PORT = process.env.PORT || 5000;

// Start the server and listen for incoming requests
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
