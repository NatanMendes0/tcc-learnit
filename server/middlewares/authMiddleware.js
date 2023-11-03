const jwt = require("jsonwebtoken");

const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Post = require("../models/postModel");


const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const authMiddleware = asyncHandler(async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies && req.cookies.refreshToken) {
    const refreshToken = req.cookies.refreshToken;
    const user = await User.findOne({ refreshToken });
    if (user) {
      token = generateToken(user._id);
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
    }
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      if (user) {
        req.user = user;
        next();
      } else {
        throw new Error("Usuário passou no teste de autenticação, mas não foi encontrado no banco de dados.");
      }
    } catch (error) {
      throw new Error('Token expirado / Usuário não autorizado. Faça login novamente.');
    }
  } else {
    throw new Error("Não há token anexado ao cabeçalho");
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  if (req.user.role === "admin") {
    next();
  } else if (req.user.role === "user") {
    const post = await Post.findById(req.params.id);
    if (post.user._id.toString() === req.user._id.toString()) {
      next();
    } else {
      res.status(403).json({ message: "Você não tem permissão para acessar esta rota." });
    }
  } else {
    res.status(403).json({ message: "Você não tem permissão para acessar esta rota." });
  }
});

module.exports = { authMiddleware, isAdmin };
