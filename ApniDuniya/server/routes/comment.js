const router=require("express").Router();
const Comment=require("../models/Comment.js");
const User=require("../models/User.js");
const Post=require("../models/Post.js");
const {addComment, getComments, updateComment, deleteComment}=require("../controllers/comment.js");
const {verifyToken,verifyTokenAndAdmin}=require("../middleware/auth.js");

router.post('/:id/comments', verifyToken, addComment);
router.get('/:id/comments', verifyToken, getComments);
router.patch('/:id/comments/:commentId', verifyToken, updateComment);
router.delete('/:id/comments/:commentId', verifyToken, deleteComment);

module.exports=router;
