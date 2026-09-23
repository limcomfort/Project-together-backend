import { Router } from "express";
import {
  getAllPosts,
  getPostById,
  createPost,
  deletePost,
} from "../controllers.js";

const router = Router();

router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.post("/", createPost);
router.delete("/:id", deletePost);

export default router;
