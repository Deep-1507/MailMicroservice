import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import mainRoutes from "./routers/mailRouter.js";
import { MONGO_URI } from "./config.js";

dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// Routes
app.use("/api/v4", mainRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    error: "Internal Server Error",
  });
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});