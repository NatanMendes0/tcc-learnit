const express = require('express')

const {
    createPost,
    getPosts,
    getPost,
    editPost,
    deletePost,
    rating,
} = require('../controllers/blogCtrl')
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware')

const router = express.Router()


router.post('/', authMiddleware, isAdmin, createPost)
router.get('/get-posts', authMiddleware, getPosts)
router.get('/get-post/:id', authMiddleware, getPost)
router.put('/edit-post/:id', authMiddleware, isAdmin, editPost)
router.delete('/delete-post/:id', authMiddleware, isAdmin, deletePost)
router.put('/rating/:id', authMiddleware, rating)

module.exports = router
