const express = require("express");
const { getFeedPosts, getUserPosts, likePost, deletePost } = require("../controllers/posts.js");
const { verifyToken } = require("../middleware/auth.js");
const router = express.Router();

router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);
router.patch("/:id/like", verifyToken, likePost);
router.delete("/:id", verifyToken, deletePost);

module.exports = router;
