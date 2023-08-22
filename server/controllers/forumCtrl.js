const User = require('../models/userModel')
const Post = require('../models/postModel')

const asyncHandler = require('express-async-handler')
const slugify = require('slugify')
const multer = require('multer')
const mongoose = require('mongoose')
const path = require('path')
const validateMongodbId = require('../utils/validateMongodbId')

const createPost = asyncHandler(async (req, res, next) => {
  const { email, title, description } = req.body

  const checkPost = await Post.findOne({ title })

  if (checkPost) {
    return res.status(400).json({ message: 'Já existe um post com esse título' })
  }

  const user = await User.findOne({ email })

  if (!user) {
    return res.status(404).json({ message: 'Usuário não encontrado' })
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "Public/Images")
    },
    filename: (req, file, cb) => {
      const fileName = file.fieldname + "_" + Date.now() + path.extname(file.originalname)
      cb(null, fileName)
    },
  })

  const upload = multer({ storage: storage }).single('file')

  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao fazer o upload da imagem' })
    }

    const newPostData = {
      user: user._id,
      title,
      description,
      file: req.file ? req.file.filename : null,
    }

    try {
      const newPost = await Post.create(newPostData)
      res.json({ message: 'Post criado com sucesso!', post: newPost })
    } catch (error) {
      res.status(500).json({ message: 'Erro ao criar o post', error })
    }
  })
})

const getPosts = asyncHandler(async (req, res) => {
  try {
    const posts = await Post.find().populate('user')
    res.json(posts)
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar os posts', error })
  }
})


const getPost = asyncHandler(async (req, res) => {
  const postId = req.params.id

  try {
    const post = await Post.findById(postId).populate('user')
    if (!post) {
      return res.status(404).json({ message: 'Post não encontrado' })
    }
    res.json(post)
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar o post', error })
  }
})


const editPost = asyncHandler(async (req, res) => {
  const postId = req.params.id
  const { title, description } = req.body

  try {
    const updatedPost = await Post.findOneAndUpdate(
      { _id: postId },
      { $set: { title, description } },
      { new: true }
    )

    if (!updatedPost) {
      return res.status(404).json({ message: 'Post não encontrado' })
    }

    res.json({ message: 'Post atualizado com sucesso!', post: updatedPost })
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar o post', error })
  }
})



const deletePost = asyncHandler(async (req, res) => {
  const postId = req.params.id
  try {
    const deletedPost = await Post.findByIdAndDelete(postId)
    if (!deletedPost) {
      return res.status(404).json({ message: 'Post não encontrado' })
    }

    res.json({ message: 'Post deletado com sucesso!' })
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar o post', error })
  }
})

const rating = asyncHandler(async (req, res) => {
  const { _id } = req.user
  const prodId = req.params.id
  const { liked, comment } = req.body
  try {
    const post = await Post.findById(prodId)
    if (!post) {
      return res.status(404).json({ message: 'Post não encontrado' })
    }

    let alreadyRated = post.ratings.find(
      (rating) => rating.postedby.toString() === _id.toString()
    )

    if (alreadyRated) {
      alreadyRated.liked = liked
      alreadyRated.comment = comment
    } else {
      post.ratings.push({
        liked,
        comment,
        postedby: _id,
      })
    }

    await post.save()

    const totalLikes = post.ratings.filter((rating) => rating.liked === true).length
    const totalDislikes = post.ratings.filter((rating) => rating.liked === false).length

    post.totalLikes = totalLikes
    post.totalDislikes = totalDislikes
    
    res.json(post)
  } catch (error) {
    res.status(500).json({ message: 'Erro ao avaliar o post', error: error.message })
  }
})



module.exports = {
  createPost,
  getPosts,
  getPost,
  editPost,
  deletePost,
  rating,
}
