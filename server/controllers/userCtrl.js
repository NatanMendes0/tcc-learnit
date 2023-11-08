const User = require("../models/userModel");

const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");

const { generateRefreshToken } = require("../config/refreshtoken");
const bcrypt = require("bcrypt");
const fs = require("fs");
const validateMongoDbId = require("../utils/validateMongodbId");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const crypto = require("crypto");
const nodemailer = require('nodemailer')
const { v4: uuidv4, validate: uuidValidate } = require("uuid");
const sendEmail = require("./emailCtrl");
const Post = require("../models/postModel");
const Material = require("../models/materialModel");
const PasswordReset = require("../models/passwordResetModel");
const MAX_LOGIN_ATTEMPTS = 5;

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

//create a new user
const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email: email });

  if (!findUser) {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    throw new Error("Usuário já existente no sistema.");
  }
});

// Login a User
const loginUserCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const findUser = await User.findOne({ email });
  if (findUser) {
    if (findUser.isBlocked) {
      throw new Error(
        "Não foi possível fazer login, o usuário está bloqueado."
      );
    }
    if (await findUser.isPasswordMatched(password)) {
      const refreshToken = await generateRefreshToken(findUser.id);
      const updateUser = await User.findByIdAndUpdate(
        findUser.id,
        {
          refreshToken: refreshToken,
        },
        { new: true }
      );
      await User.findByIdAndUpdate(findUser.id, {
        loginAttempts: 0,
      });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 72 * 60 * 60 * 1000,
      });

      res.json({
        _id: findUser?._id,
        name: findUser?.name,
        email: findUser?.email,
        nickname: findUser?.nickname,
        role: findUser?.role,
        token: generateToken(findUser?._id),
      });
    } else {
      await User.findByIdAndUpdate(findUser.id, {
        $inc: { loginAttempts: 1 },
      });
      const updatedUser = await User.findById(findUser.id);
      if (updatedUser.loginAttempts >= MAX_LOGIN_ATTEMPTS) {
        await User.findByIdAndUpdate(findUser.id, {
          isBlocked: true,
        });
        throw new Error(
          "Não foi possível fazer login, o usuário está bloqueado."
        );
      }
      throw new Error("Credenciais inválidas, tente novamente.");
    }
  } else {
    throw new Error("Credenciais inválidas, tente novamente.");
  }
});

// Check if user is logged in
const handleLoggedIn = asyncHandler(async (req, res) => {
  const cookie = req.cookies;

  let refreshToken = cookie.refreshToken;

  if (!refreshToken) {
    return res.sendStatus(204);
  }

  const findUser = await User.findOne({ refreshToken });

  if (!findUser) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });

    return res.sendStatus(204);
  }

  refreshToken = await generateRefreshToken(findUser.id);

  findUser.refreshToken = refreshToken;
  await findUser.save();

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 72 * 60 * 60 * 1000,
  });

  await new Promise((resolve) => setTimeout(resolve, 100));

  res.json({
    _id: findUser?._id,
    name: findUser?.name,
    email: findUser?.email,
    role: findUser?.role,
    nickname: findUser?.nickname,
    token: refreshToken,
  });
});

// handle refresh token
const handleRefreshToken = asyncHandler(async (req, res) => {
  try {
    const cookie = req.cookies;
    if (!cookie?.refreshToken)
      throw new Error("Nenhuma atualização de token nos cookies");
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });
    if (!user) throw new Error("No refresh token present in db");
    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
      if (err || user.id !== decoded.id) {
        throw new Error("There is something wrong with refresh token");
      } else {
        const accessToken = generateToken(user?.id);
        res.json({ accessToken });
      }
    });
  } catch (error) {
    const errorMessage = error.message;
    const errorResponse = {
      error: true,
      message: errorMessage,
    };
    res.status(500).json(errorResponse);
  }
});

// logout fuction
const logout = asyncHandler(async (req, res) => {
  try {
    const cookie = req.cookies;

    if (!cookie?.refreshToken) {
      throw new Error("Nenhuma atualização de token nos cookies");
    }

    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });

    if (!user) {
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
      });
      return res.sendStatus(204);
    }

    await User.findByIdAndUpdate(user._id, {
      refreshToken: "",
    });

    if (req.cookies.refreshToken) {
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
      });
    }

    if (req.cookies.token) {
      res.clearCookie("token", {
        httpOnly: true,
        secure: true,
      });
    }

    return res.sendStatus(204);
  } catch (error) {
    const errorMessage = error.message;
    const errorResponse = {
      error: true,
      message: errorMessage,
    };
    res.status(500).json(errorResponse);
  }
});

// update a user
const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        name: req?.body?.name,
        nickname: req?.body?.nickname,
        email: req?.body?.email,
      },
      {
        new: true,
      }
    );
    res.json(updatedUser);
  } catch (error) {
    throw new Error(error);
  }
});

// get a single user
const getUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getUser = await await User.findById(id, "name email nickname");
    res.json({
      getUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});



// delete a user and all his posts, materials and comments
const deleteUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ message: "Usuário não encontrado" });
  }

  // Delete all posts of the user
  await Post.deleteMany({ user: userId });

  // Delete all materials of the user
  await Material.deleteMany({ user: userId });

  // Delete all comments of the user in posts
  await Post.updateMany(
    { "ratings.postedBy": userId },
    { $pull: { ratings: { postedBy: userId } } }
  );

  // Delete all comments of the user in materials
  await Material.updateMany(
    { "ratings.postedBy": userId },
    { $pull: { ratings: { postedBy: userId } } }
  );

  // Delete the user
  const deletedUser = await User.findByIdAndDelete(userId);

  if (!deletedUser) {
    return res.status(404).json({ message: "Material não encontrado" });
  }

  res.json({ message: "Usuário e todo seu conteúdos deletados com sucesso" });
});

const forgotPasswordToken = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "Email não cadastrado" });
  }

  const request = await PasswordReset.findOne({ userId: user._id });

  if (request) {
    await PasswordReset.findByIdAndDelete(request._id);
  }

  let uuid = uuidv4();

  await PasswordReset.create({
    token: uuid,
    userId: user._id,
  });

  let mailOptions = {
    from: '"Learn It" <suporte@learnit.com>',
    to: user.email,
    subject: "Recuperação de senha",
    html:
      "Recupera a senha trouxa <br/> <a href='http://localhost:3000/reset-password/" +
      uuid +
      "'>aqui</a>",
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log(err);
      return res.status(422).json({
        message: "Houve um problema, por favor tente novamente mais tarde",
      });
    } else {
      console.log("Email sent");
      return res.status(200).json({ message: "Email enviado com sucesso!" });
    }
  });
};

const validateToken = async (token) => {
  let isValid = true;
  let error = null;

  if (!uuidValidate(token)) {
    isValid = false;
    error = "Token inválido";
  }

  const request = await PasswordReset.findOne({ token });
  if (!request) {
    isValid = false;
    error = "Token inválido";
  }

  return { isValid, request, error };
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const { isValid, request, error } = await validateToken(token);

  if (!isValid) {
    return res.status(401).json({ message: error });
  }

  try {
    const user = await User.findById(request.userId);

    user.password = password;
    
    await user.save();

    await PasswordReset.findByIdAndDelete(request._id);

    return res.status(200).json({ message: "Senha atualizada com sucesso!" });
  } catch (error) {
    return res.status(422).json({
      message: "Houve um problema, por favor tente novamente mais tarde",
    });
  }
};

module.exports = {
  handleLoggedIn,
  createUser,
  loginUserCtrl,
  getUser,
  updateUser,
  handleRefreshToken,
  logout,
  deleteUser,
  forgotPasswordToken,
  resetPassword,
};
