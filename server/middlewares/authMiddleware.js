const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  } else if (req.cookies && req.cookies.refreshToken) {
    const refreshToken = req.cookies.refreshToken
    const user = await User.findOne({ refreshToken })
    if (user) {
      token = generateToken(user.id)
      res.cookie('token', token, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })
    }
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      const user = await User.findById(decoded.id)
      if (user) {
        req.user = user
      } else {
        throw new Error('Usuário não encontrado')
      }
    } catch (error) {
      // throw new Error('Token expirado / Usuário não autorizado. Faça login novamente.')
      throw new Error(error)
      console.log(process.env.JWT_SECRET)
    }
  } else {
    throw new Error('Não há token anexado ao cabeçalho')
  }

  next()
})

const isAdmin = asyncHandler(async (req, res, next) => {
  if (req.user.role === 'admin') {
    next()
  } else {
    throw new Error('Você não é administrador.')
  }
})


module.exports = { authMiddleware, isAdmin }