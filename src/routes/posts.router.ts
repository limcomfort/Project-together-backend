import { Router } from "express";
import {
  getAllPosts,
  getPostById,
  createPost,
  deletePost,
  getPostComments,
} from "../controllers.js";

const router = Router();

router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.get("/:id/comments", getPostComments);
router.post("/", createPost);
router.delete("/:id", deletePost);

export default router;
