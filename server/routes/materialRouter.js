const express = require('express')

const {
    createMaterial,
} = require('../controllers/materialCtrl')
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware')

const router = express.Router()

router.post('/', authMiddleware, isAdmin, createMaterial)

module.exports = router
