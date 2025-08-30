const express = require("express");

const { savePost, unsavePost, getSavedPosts, getSavedPostsIds, isPostSaved } = require("../controllers/savedPostControllers.js");
const router = express.Router();
const authMiddleware = require("../authMiddleware.js");

router.post("/savePost", authMiddleware, savePost);
router.delete("/unsavePost/:postId", authMiddleware, unsavePost);
router.get("/savedPosts", authMiddleware, getSavedPosts);
router.get("/savedPostsIds", authMiddleware, getSavedPostsIds);
router.get("/isPostSaved/:postId", authMiddleware, isPostSaved);

module.exports = router;