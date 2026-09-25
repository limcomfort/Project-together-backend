import { Request, Response } from "express";
import {
  getPosts,
  getPostById as findPostById,
  createPost as addPost,
  deletePost as removePost,
  getCommentsByPostId,
} from "./models.js";

export async function getAllPosts(_req: Request, res: Response) {
  const posts = await getPosts();
  res.json({ success: true, data: { posts } });
}

export async function getPostById(req: Request, res: Response) {
  const post = await findPostById(req.params.id);

  if (!post) {
    res.status(404).json({ success: false, message: "Пост не найден" });
    return;
  }

  res.json({ success: true, data: { post } });
}

export async function createPost(req: Request, res: Response) {
  const { content, author } = req.body;

  if (!content || !author) {
    res.status(400).json({ success: false, message: "Нужны content и author" });
    return;
  }

  const newPost = await addPost(content, author);
  res.status(201).json({ success: true, data: { post: newPost } });
}

export async function deletePost(req: Request, res: Response) {
  const ok = await removePost(req.params.id);

  if (!ok) {
    res.status(404).json({ success: false, message: "Пост не найден" });
    return;
  }

  res.json({ success: true });
}

export async function getPostComments(req: Request, res: Response) {
  const post = await findPostById(req.params.id);
  if (!post) {
    res.status(404).json({ success: false, message: "Пост не найден" });
    return;
  }
  const comments = await getCommentsByPostId(req.params.id);
  res.json({ success: true, data: { comments } });
}

export function notFound(req: Request, res: Response) {
  res.status(404).json({ success: false, message: "Маршрут не найден" });
}
