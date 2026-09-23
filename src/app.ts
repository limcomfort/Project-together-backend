import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import postsRoutes from "./routes/posts.router.js";
import usersRoutes from "./routes/users.router.js";
import { notFound } from "./controllers.js";

dotenv.config();

const app: Express = express();
const port = Number(process.env.PORT) || 5000;

app.use(express.json());
app.use(cors());

app.use("/api/posts", postsRoutes);
app.use("/api/users", usersRoutes);

app.use(notFound);

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
