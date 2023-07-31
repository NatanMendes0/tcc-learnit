require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const forumRoutes = require("./routes/forum");

// Connect to MongoDB
connection();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
// app.use("/api/users", userRoutes);
// app.use("/api/auth", authRoutes);
app.use("/forum", forumRoutes);

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Servidor escutando na porta ${port}!`));
