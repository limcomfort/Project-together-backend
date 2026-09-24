import { Schema, model } from "mongoose";
import type { User } from "../data.js";

const userSchema = new Schema<User>({
  id: { type: String, required: true, unique: true, index: true },
  username: { type: String, required: true },
  fullName: { type: String, required: true },
  biography: { type: String, default: "" },
  avatarUrl: { type: String, default: null },
  bannerURL: { type: String, default: null },
  passwordHash: { type: String, required: true },
  createdAt: { type: String, default: () => new Date().toISOString() },
});
userSchema.set("toJSON", {
  versionKey: false,
  transform: (_doc: unknown, ret: object) => {
    delete (ret as { _id?: unknown; passwordHash?: unknown })._id;
    delete (ret as { _id?: unknown; passwordHash?: unknown }).passwordHash;
    return ret;
  },
});

export const UserModel = model<User>("User", userSchema);

export async function getAllUsers(): Promise<User[]> {
  return UserModel.find().sort({ id: 1 });
}

export async function getUserById(id: string): Promise<User | null> {
  return UserModel.findOne({ id });
}
