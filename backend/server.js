import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";

// dotenv
dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.send("Api is running....");
});

app.use("/api/v1", authRoutes);

// Listeners
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";

app.listen(PORT, () => {
  console.log(`Server is running in ${NODE_ENV} mode on port ${PORT}`);
});
