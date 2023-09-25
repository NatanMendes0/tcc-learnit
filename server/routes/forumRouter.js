const express = require('express')

const {
    createPost,
    getPosts,
    getPost,
    editPost,
    deletePost,
    rating,
} = require('../controllers/forumCtrl')
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware')

const router = express.Router()


// router.post('/', authMiddleware, isAdmin, createPost) rota para criar post apenas para admins
router.post('/', authMiddleware, createPost)
router.get('/get-posts', getPosts)
router.get('/get-post/:id', getPost)
router.put('/edit-post/:id', authMiddleware, isAdmin, editPost)
router.delete('/delete-post/:id', authMiddleware, isAdmin, deletePost)
router.put('/rating/:id', authMiddleware, rating)

module.exports = router
