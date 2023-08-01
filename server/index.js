require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connection = require("./db");
const authRoutes = require("./authRoutes");
const protectedRoutes = require("./routes/protectedRoutes");

const app = express();

// Connect to MongoDB
connection();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", authRoutes);
app.use("/api", protectedRoutes);


const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Servidor escutando na porta ${port}!`));
