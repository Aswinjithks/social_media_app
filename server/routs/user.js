import express from "express";
import {
  getUser,
  addRemoveFriends,
  getUserFriends,
} from "../controllers/user.js";
import { veryfyToken } from "../middleware/auth.js";

const router = express.Router();

//READ
router.get("/:id", veryfyToken, getUser);
router.get("/:id/friends", veryfyToken, getUserFriends);

//UPDATE
router.patch("/:id/:friendsId", veryfyToken, addRemoveFriends);

export default router;
