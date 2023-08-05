const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const path = require("path");
const connection = require("./db");
const UserModel = require("./models/User");
const PostModel = require("./models/Post");

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
app.use(express.static("public"));

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
  UserModel.findOne({ email: req.email })
    .then((user) => res.json(user))
    .catch((err) => {
      res.status(500).json({ message: "Erro interno no servidor" });
    });
});

app.post("/api/register", (req, res) => {
  const { name, email, password, nickname } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      UserModel.create({
        name,
        email,
        password: hash,
        nickname,
        role: "learner",
      })
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
            {
              email: user.email,
              name: user.name,
              nickname: user.nickname,
              role: user.role,
            },
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

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Public/Images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

app.post("/api/createPost", verifyUser, upload.single("file"), (req, res) => {
  PostModel.create({
    nickname: req.body.nickname,
    name: req.body.name,
    email: req.body.email,
    title: req.body.title,
    description: req.body.description,
    file: req.file.filename,
  })
    .then((result) => res.json("Post criado com sucesso!"))
    .catch((err) => res.json(err));
});

app.get("/api/getPosts", (req, res) => {
  PostModel.find()
    .then((posts) => res.json(posts))
    .catch((err) => res.json(err));
});

app.get("/api/logout", (req, res) => {
  res.clearCookie("token");
  return res.json("Success");
});

app.get("/api/getPost/:id", (req, res) => {
  PostModel.findById(req.params.id)
    .then((post) => res.json(post))
    .catch((err) => res.json(err));
});

app.put("/api/editPost/:id", verifyUser, (req, res) => {
  PostModel.findByIdAndUpdate(
    { _id: req.params.id },
    {
      title: req.body.title,
      description: req.body.description,
    }
  )
    .then((result) => res.json("Post editado com sucesso!"))
    .catch((err) => res.json(err));
});

app.delete("/api/deletePost/:id", verifyUser, (req, res) => {
  PostModel.findByIdAndDelete(req.params.id)
    .then((result) => res.json("Post deletado com sucesso!"))
    .catch((err) => res.json(err));
});

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Servidor escutando na porta ${port}!`));
