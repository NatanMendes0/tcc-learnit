const Post = require("../models/postModel");

const asyncHandler = require("express-async-handler");
const path = require("path");
const crypto = require("crypto");
const formidable = require("formidable");
const fs = require("fs");

const createPost = asyncHandler(async (req, res, next) => {
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    if (err) throw err;
    
    if (files['file[]'] && Array.isArray(files['file[]']) && files['file[]'].length > 0) {
      // One file was uploaded
      var oldpath = files['file[]'][0].filepath;
      var hash = crypto.createHash('md5').update(Date.now().toString()).digest('hex');
      var ext = path.extname(files['file[]'][0].originalFilename);
      var nomeimg = hash + ext;
      console.log(nomeimg);
      var newpath = path.join(__dirname, '../Public/Images/', nomeimg);
      

      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
      });

      var title = fields.title[0];
      var description = fields.description[0];
      var user = req.user;
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
    }
    else {
      // No files were uploaded
      var title = fields.title[0];
      var description = fields.description[0];
      var user = req.user;
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
    }
  });
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
    const post = await Post.findById(postId).populate({ path: "ratings", populate: [{ path: "postedby", select: "name nickname role" }] }).populate("user", "name nickname");
    if (!post) {
      return res.status(404).json({ message: "Post não encontrado" });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar o post", error });
  }
});

const editPost = asyncHandler(async (req, res) => {
  var id = req.params.id;
  var form = new formidable.IncomingForm();
  form.parse(req, async function (err, fields, files) {
    if (err) throw err;

    if (files['file[]'] && Array.isArray(files['file[]']) && files['file[]'].length > 0) {
      // One file was uploaded
      var oldpath = files['file[]'][0].filepath;
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
      const newPostData = {
        user: user._id,
        title,
        description,
        file: nomeimg ? nomeimg : null,
        filePath: nomeimg ? `/Images/${nomeimg}` : null,
      };

      try {
        const post = await Post.findById(req.params.id);
        post.title = title;
        post.description = description;
        post.file = nomeimg ? nomeimg : null;
        post.filePath = nomeimg ? `/Images/${nomeimg}` : null;
        const newPost = post.save();
        res.json({ message: "Post criado com sucesso!", post: newPost });
      } catch (error) {
        res.status(500).json({ message: "Erro ao criar o post", error });
      }
    }
    else {
      // No files were uploaded
      var title = fields.title[0];
      var description = fields.description[0];
      var user = req.user;
      const newPostData = {
        user: user._id,
        title,
        description,
        file: nomeimg ? nomeimg : null,
        filePath: nomeimg ? `/Images/${nomeimg}` : null,
      };

      try {
        const post = await Post.findById(req.params.id);
        post.title = title;
        post.description = description;
        post.file = nomeimg ? nomeimg : null;
        post.filePath = nomeimg ? `/Images/${nomeimg}` : null;
        const newPost = post.save();
        res.json({ message: "Post criado com sucesso!", post: newPost });
      } catch (error) {
        res.status(500).json({ message: "Erro ao criar o post", error });
        throw error;
      }
    }
  });
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
  if (!req.cookies.refreshToken) {
    return res.status(401).json({ message: "Você não realizou seu login" });
  }

  const { _id } = req.user;
  const postID = req.params.id;
  const { comment } = req.body;
  try {
    const post = await Post.findById(postID);
    if (!post) {
      return res.status(404).json({ message: "Post não encontrado" });
    }

    post.ratings.push({
      comment,
      postedby: _id,
    });

    await post.save();

    res.json({ message: "Comentário adicionado!", post: post });
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