const express = require("express");
const postController = require("../controllers/BloodPostController");
const {verifyUser } = require("../controllers/UserControler");
const router = express.Router();


router.post("/posts", verifyUser, postController.createPost);
router.get("/posts", postController.getAllPosts);
router.post("/posts/:postId/comments", verifyUser, postController.addComment);
router.post("/posts/:postId/like", verifyUser, postController.likePost);

module.exports = router;
