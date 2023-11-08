const express = require('express')

const {
  createUser,
  loginUserCtrl,
  getUser,
  updateUser,
  handleRefreshToken,
  logout,
  forgotPasswordToken,
  resetPassword,
  deleteUser,
  handleLoggedIn,
} = require('../controllers/userCtrl')
const { authMiddleware } = require('../middlewares/authMiddleware')

const router = express.Router()


router.post('/register', createUser)
router.post('/forgot-password-token', forgotPasswordToken)
router.put('/reset-password/:token', resetPassword)

router.post('/login', loginUserCtrl)
router.get('/relogin', handleLoggedIn)

router.get('/refresh', handleRefreshToken)
router.get('/logout', logout)

router.get('/:id', authMiddleware, getUser)

router.put('/edit-user/:id', authMiddleware, updateUser)

router.delete('/delete-user/:id', authMiddleware, deleteUser)

module.exports = router
