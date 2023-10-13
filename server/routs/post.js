import express from 'express'
import { veryfyToken } from "../middleware/auth.js";
import { getFeedPosts, getUsersPosts, likePost } from "../controllers/post.js";

const router = express.Router();

// READ
router.get("/", veryfyToken, getFeedPosts);
router.get("/:userId/posts", veryfyToken, getUsersPosts);

//UPDATE
router.patch("/:id/like", veryfyToken,likePost)


export default router;