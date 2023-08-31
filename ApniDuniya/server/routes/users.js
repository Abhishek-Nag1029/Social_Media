const express = require("express");
const router = express.Router();
const {getUser,getUserFriends,addRemoveFriend,findUser}=require("../controllers/users.js");
const {verifyToken}=require("../middleware/auth.js");


router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);
router.get('/find/me',verifyToken,findUser);

module.exports = router;
