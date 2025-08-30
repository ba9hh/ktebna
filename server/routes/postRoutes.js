const express = require("express");
const { createPost, getPosts, getPostsByUser, updatePost, deletePost } = require("../controllers/postControllers.js");
const authMiddleware = require("../authMiddleware.js");
const router = express.Router();

router.post("/post", authMiddleware, createPost);
router.get("/posts", authMiddleware, getPosts);
router.get("/user/posts", authMiddleware, getPostsByUser);
router.put("/post/:postId", updatePost);
router.delete("/post/:postId", deletePost);

module.exports = router;