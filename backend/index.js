const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDb = require("./config/dbConfig");
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const reviewRoutes = require("./routes/reviewRoutes")
const userRoutes = require("./routes/userRoutes")




dotenv.config();
connectDb();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth" , authRoutes);
app.use("/api/books" , bookRoutes);
app.use("/api/review" , reviewRoutes);
app.use("/api/user" , userRoutes);

app.use("/uploads" , express.static("uploads"));






app.listen(process.env.PORT, () => console.log("Server running on port 5000"));
