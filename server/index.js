const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const path = require("path");
const connection = require("./db");
const UserModel = require("./models/User");

require("dotenv").config();

// Connect to MongoDB
connection();

// Middleware
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

// Routes
// app.use("/api/users", userRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/forum", forumRoutes);

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json("Token não encontrado!");
  } else {
    jwt.verify(token, process.env.JWTPRIVATEKEY, (err, decoded) => {
      if (err) {
        return res.json("Token inválido!");
      } else {
        req.email = decoded.email;
        req.name = decoded.name;
        next();
      }
    });
  }
};

app.get("/api/getUser", verifyUser, (req, res) => {
  return res.json({ email: req.email, name: req.name });
});

app.post("/api/register", (req, res) => {
  const { name, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      UserModel.create({ name, email, password: hash })
        .then((user) => res.json(user))
        .catch((err) => res.json(err));
    })
    .catch((err) => res.json(err));
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, response) => {
        if (response) {
          const token = jwt.sign(
            { email: user.email, name: user.name },
            process.env.JWTPRIVATEKEY,
            { expiresIn: "1h" }
          );
          res.cookie("token", token);  
          return res.json("Login efetuado com sucesso!");
        } else {
          return res.json("Senha incorreta!");
        }
      });
    } else {
      res.json({ message: "Usuário não encontrado!" });
    }
  });
});

app.get('/api/logout', (req, res) => {
    res.clearCookie('token');
    return res.json("Success")
})

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Servidor escutando na porta ${port}!`));
