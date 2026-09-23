import { Request, Response } from "express";
import {
  getPosts,
  getPostById as findPostById,
  createPost as addPost,
  deletePost as removePost,
} from "./models.js";

export function getAllPosts(req: Request, res: Response) {
  res.json({
    success: true,
    data: { posts: getPosts() },
  });
}

export function getPostById(req: Request, res: Response) {
  const post = findPostById(req.params.id);

  if (!post) {
    res.status(404).json({ success: false, message: "Пост не найден" });
    return;
  }

  res.json({ success: true, data: { post } });
}

export function createPost(req: Request, res: Response) {
  const { content, author } = req.body;

  if (!content || !author) {
    res.status(400).json({ success: false, message: "Нужны content и author" });
    return;
  }

  const newPost = addPost(content, author);
  res.status(201).json({ success: true, data: { post: newPost } });
}

export function deletePost(req: Request, res: Response) {
  const ok = removePost(req.params.id);

  if (!ok) {
    res.status(404).json({ success: false, message: "Пост не найден" });
    return;
  }

  res.json({ success: true });
}

export function notFound(req: Request, res: Response) {
  res.status(404).json({ success: false, message: "Маршрут не найден" });
}
