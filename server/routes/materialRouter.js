const express = require('express')

const {
    getMaterials,
    createMaterial,
    getMaterial,
    deleteMaterial,
    rating,
    getStep,
    addStep,
    editStep,
    deleteStep,
} = require('../controllers/materialCtrl')
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware')

const router = express.Router()

//todo - criar um meio de inserir varios posts dentro de um material
router.post('/', authMiddleware, isAdmin, createMaterial)
router.get('/get-materials', getMaterials)
router.get('/get-material/:id', getMaterial)
router.delete('/delete-material/:id', authMiddleware, isAdmin, deleteMaterial)

router.get('/get-step/:id/:stepId', authMiddleware, isAdmin, getStep)
router.post('/add-step/:id', authMiddleware, isAdmin, addStep)
router.put('/edit-step/:id/:stepId', authMiddleware, isAdmin, editStep)
router.delete('/delete-step/:id/:stepId', authMiddleware, isAdmin, deleteStep)

router.post('/rating/:id', authMiddleware, rating)

module.exports = router
