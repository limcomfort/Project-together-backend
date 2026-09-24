import mongoose from "mongoose";
import { PostModel, CommentModel } from "./models.js";
import { UserModel } from "./models/users.js";
import { posts as seedPosts, comments as seedComments, users as seedUsers } from "./data.js";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/together";

async function seedIfEmpty(): Promise<void> {
  if ((await PostModel.countDocuments()) === 0) await PostModel.insertMany(seedPosts);
  if ((await CommentModel.countDocuments()) === 0) await CommentModel.insertMany(seedComments);
  if ((await UserModel.countDocuments()) === 0) await UserModel.insertMany(seedUsers);
  console.log("Начальные данные загружены в MongoDB");
}

export async function connectDB(): Promise<void> {
  try {
    await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 3000 });
    console.log(`MongoDB подключена: ${mongoose.connection.host}/${mongoose.connection.name}`);
  } catch (primaryError) {
    if (process.env.NODE_ENV === "production") {
      throw primaryError;
    }
    console.warn(
      `Не удалось подключиться к ${MONGODB_URI} — запускаю локальный in-memory MongoDB для разработки`,
    );
    const { MongoMemoryServer } = await import("mongodb-memory-server");
    const memoryServer = await MongoMemoryServer.create();
    await mongoose.connect(memoryServer.getUri("together"));
    console.log(`MongoDB (in-memory): ${memoryServer.getUri("together")}`);
  }
  await seedIfEmpty();
}
