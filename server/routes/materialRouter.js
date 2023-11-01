const express = require('express')

const {
    getMaterials,
    createMaterial,
    getMaterial,
    editMaterial,
    deleteMaterial,
    rating,
    addStep,
    deleteStep,
} = require('../controllers/materialCtrl')
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware')

const router = express.Router()

//todo - criar um meio de inserir varios posts dentro de um material
router.post('/', authMiddleware, isAdmin, createMaterial)
router.get('/get-materials', getMaterials)
router.get('/get-material/:id', getMaterial)
router.put('/edit-material/:id', authMiddleware, isAdmin, editMaterial)
router.delete('/delete-material/:id', authMiddleware, isAdmin, deleteMaterial)
router.post('/add-step/:id', authMiddleware, isAdmin, addStep)
router.delete('/delete-step/:id/:stepId', authMiddleware, isAdmin, deleteStep)
router.post('/rating/:id', authMiddleware, rating)

module.exports = router
