const User = require("../models/userModel");
const Post = require("../models/postModel");

const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const multer = require("multer");
const mongoose = require("mongoose");
const path = require("path");
const crypto = require("crypto");
const validateMongodbId = require("../utils/validateMongodbId");
const formidable = require("formidable");
const fs = require("fs");

// const createPost = asyncHandler(async (req, res, next) => {
//   console.log("req.body", req.body);
//   const { title, description } = req.body;
//   const { email } = req.user;

//   const checkPost = await Post.findOne({ title });

//   if (checkPost) {
//     return res
//       .status(400)
//       .json({ message: "Já existe um post com esse título" });
//   }

//   const user = await User.findOne({ email });

//   if (!user) {
//     return res.status(404).json({ message: "Usuário não encontrado" });
//   }

//   const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, "Public/Images");
//     },
//     filename: (req, file, cb) => {
//       const fileName =
//         file.fieldname + "_" + Date.now() + path.extname(file.originalname);
//       cb(null, fileName);
//     },
//   });

//   const upload = multer({ storage: storage }).single("file");

//   upload(req, res, async (err) => {
//     if (err) {
//       return res
//         .status(500)
//         .json({ message: "Erro ao fazer o upload da file" });
//     }

//     const newPostData = {
//       user: user._id,
//       title,
//       description,
//       file: req.file ? req.file.filename : null,
//     };

//     try {
//       const newPost = await Post.create(newPostData);
//       res.json({ message: "Post criado com sucesso!", post: newPost });
//     } catch (error) {
//       res.status(500).json({ message: "Erro ao criar o post", error });
//     }
//   });
// });

const createPost = asyncHandler(async (req, res, next) => {
  //TODO - arrumar inserção de file - não está sendo enviada a file pelo formulario
  var form = new formidable.IncomingForm();
  console.log(req)
  form.parse(req, function (err, fields, files) {
    if (err) throw err;
    console.log(files['file[]'][0])

    var oldpath = files['file[]'][0].filepath;
    console.log(oldpath)
        var hash = crypto.createHash('md5').update(Date.now().toString()).digest('hex');
        var ext = path.extname(files['file[]'][0].originalFilename);
        var nomeimg = hash + ext;
        var newpath = path.join(__dirname, '../Public/Images/', nomeimg);

        fs.rename(oldpath, newpath, function (err) {
            if (err) throw err;
        });

        var title = fields.title[0];
        var description = fields.description[0];
        var user = req.user;
        console.log(fields)
        const newPostData = {
          user: user._id,
          title,
          description,
          file: nomeimg ? nomeimg : null,
          filePath: nomeimg ? `/Images/${nomeimg}` : null,
        };

        try {
          const newPost = Post.create(newPostData);
          res.json({ message: "Post criado com sucesso!", post: newPost });
        } catch (error) {
          res.status(500).json({ message: "Erro ao criar o post", error });
        }
  });
  console.log('depois')
  const { title, description } = req.body;
  const { email } = req.user;

  const checkPost = await Post.findOne({ title });

  if (checkPost) {
    return res
      .status(400)
      .json({ message: "Já existe um post com esse título" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        console.log(file);
        cb(null, "../Public/Images");
      },
      filename: (req, file, cb) => {
        const fileName =
          file.fieldname + "_" + Date.now() + path.extname(file.originalname);
        cb(null, fileName);
      },
    });

    const upload = multer({ storage: storage }).single("file");

    upload(req, res, async (err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Erro ao fazer o upload da imagem" });
      }

      const newPostData = {
        user: user._id,
        title,
        description,
        file: req.file ? req.file.filename : null,
        filePath: req.file ? `/Images/${req.file.filename}` : null,
      };

      try {
        const newPost = await Post.create(newPostData);
        res.json({ message: "Post criado com sucesso!", post: newPost });
      } catch (error) {
        res.status(500).json({ message: "Erro ao criar o post", error });
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar o post", error });
  }
});

const getPosts = asyncHandler(async (req, res) => {
  try {
    const posts = await Post.find().populate("user");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar os posts", error });
  }
});

const getPost = asyncHandler(async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await Post.findById(postId).populate("user");
    if (!post) {
      return res.status(404).json({ message: "Post não encontrado" });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar o post", error });
  }
});

const editPost = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  const { title, description } = req.body;

  try {
    const updatedPost = await Post.findOneAndUpdate(
      { _id: postId },
      { $set: { title, description } },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Post não encontrado" });
    }

    res.json({ message: "Post atualizado com sucesso!", post: updatedPost });
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar o post", error });
  }
});

const deletePost = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  try {
    const deletedPost = await Post.findByIdAndDelete(postId);
    if (!deletedPost) {
      return res.status(404).json({ message: "Post não encontrado" });
    }

    res.json({ message: "Post deletado com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar o post", error });
  }
});

const rating = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const prodId = req.params.id;
  const { liked, comment } = req.body;
  try {
    const post = await Post.findById(prodId);
    if (!post) {
      return res.status(404).json({ message: "Post não encontrado" });
    }

    let alreadyRated = post.ratings.find(
      (rating) => rating.postedby.toString() === _id.toString()
    );

    if (alreadyRated) {
      alreadyRated.liked = liked;
      alreadyRated.comment = comment;
    } else {
      post.ratings.push({
        liked,
        comment,
        postedby: _id,
      });
    }

    await post.save();

    const totalLikes = post.ratings.filter(
      (rating) => rating.liked === true
    ).length;
    const totalDislikes = post.ratings.filter(
      (rating) => rating.liked === false
    ).length;

    post.totalLikes = totalLikes;
    post.totalDislikes = totalDislikes;

    res.json(post);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao avaliar o post", error: error.message });
  }
});

module.exports = {
  createPost,
  getPosts,
  getPost,
  editPost,
  deletePost,
  rating,
};
