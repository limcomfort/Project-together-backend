import { Schema, model } from "mongoose";

export interface Post {
  id: string;
  content: string;
  author: string;
  createdAt: string;
}

export interface Comment {
  id: string;
  postId: string;
  content: string;
  author: string;
  createdAt: string;
}

const jsonOptions = {
  versionKey: false,
  transform: (_doc: unknown, ret: object) => {
    delete (ret as { _id?: unknown })._id;
    return ret;
  },
};

const postSchema = new Schema<Post>({
  id: { type: String, required: true, unique: true, index: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  createdAt: { type: String, default: () => new Date().toISOString() },
});
postSchema.set("toJSON", jsonOptions);

const commentSchema = new Schema<Comment>({
  id: { type: String, required: true, unique: true, index: true },
  postId: { type: String, required: true, index: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  createdAt: { type: String, default: () => new Date().toISOString() },
});
commentSchema.set("toJSON", jsonOptions);

export const PostModel = model<Post>("Post", postSchema);
export const CommentModel = model<Comment>("Comment", commentSchema);

export async function getPosts(): Promise<Post[]> {
  return PostModel.find().sort({ createdAt: 1 });
}

export async function getPostById(id: string): Promise<Post | null> {
  return PostModel.findOne({ id });
}

export async function createPost(content: string, author: string): Promise<Post> {
  return PostModel.create({ id: Date.now().toString(), content, author });
}

export async function deletePost(id: string): Promise<boolean> {
  const removed = await PostModel.findOneAndDelete({ id });
  return removed !== null;
}

export async function getCommentsByPostId(postId: string): Promise<Comment[]> {
  return CommentModel.find({ postId });
}
