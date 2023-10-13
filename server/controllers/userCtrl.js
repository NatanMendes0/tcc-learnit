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
const sendEmail = require("./emailCtrl");
const MAX_LOGIN_ATTEMPTS = 5;

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

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });

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
    const getUser = await User.findById(id);
    res.json({
      getUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updatePassword = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { password } = req.body;
  validateMongoDbId(_id);
  const user = await User.findById(_id);
  if (password) {
    user.password = password;
    const updatePassword = await user.save();
    res.json(updatePassword);
  } else {
    res.json(user);
  }
});

const forgotPasswordToken = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user)
    throw new Error(
      "Não há nenhum usuário com esse e-mail na nossa base de dados."
    );
  try {
    const token = await user.createPasswordResetToken();
    await user.save();
    const emailTemplate = fs.readFileSync("./views/password.ejs", "utf-8");
    const html = ejs.render(emailTemplate, { token: token });
    // const data = {
    //   to: email,
    //   text: 'Redefinição de senha',
    //   subject: 'Link de recuperação de senha',
    //   html: html,
    // }
    // sendEmail(data)
    res.json(token);
  } catch (error) {
    throw new Error(error);
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) throw new Error("Token expirado! Tente novamente mais tarde.");

  const passwordCrypt = await bcrypt.hash(password, 10);

  const updatePassword = await User.findOneAndUpdate(
    {
      passwordResetToken: hashedToken,
    },
    {
      password: passwordCrypt,
      passwordResetToken: undefined,
      passwordResetExpires: undefined,
    }
  );

  if (updatePassword) {
    res.json(user);
  } else {
    res.send("Erro ao atualizar senha");
  }
});

module.exports = {
  handleLoggedIn,
  createUser,
  loginUserCtrl,
  getUser,
  updateUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
};
