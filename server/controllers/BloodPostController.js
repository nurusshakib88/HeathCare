const Post = require("../models/BloodPostModel");

const postController = {
  createPost: async (req, res) => {
    const { text } = req.body;
    try {
      const post = await Post.create({
        user: req.user.id, // Assuming user id is stored in req.user.id after authentication
        text,
      });
      res.status(201).json(post);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  getAllPosts: async (req, res) => {
    try {
      const posts = await Post.find().populate("user", "name");
      res.json(posts);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  addComment: async (req, res) => {
    const { postId } = req.params;
    const { text } = req.body;
    try {
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      post.comments.push({
        text,
        commentator: req.user.id, // Assuming user id is stored in req.user.id after authentication
      });
      await post.save();
      res.json(post);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  likePost: async (req, res) => {
    const { postId } = req.params;
    try {
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      if (post.likes.includes(req.user.id)) {
        return res.status(400).json({ message: "Post already liked" });
      }
      post.likes.push(req.user.id); // Assuming user id is stored in req.user.id after authentication
      await post.save();
      res.json(post);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = postController;
