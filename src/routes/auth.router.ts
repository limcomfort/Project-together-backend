import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { Request } from "express";
import { UserModel } from "../models/users.js";

const SECRET = process.env.JWT_SECRET || "ochag-dev-secret";
const router = Router();

interface AuthBody {
  username?: string;
  password?: string;
  fullName?: string;
}

const sign = (id: string) => jwt.sign({ id }, SECRET, { expiresIn: "30d" });

router.post("/register", async (req, res) => {
  const { username, password, fullName } = req.body as AuthBody;
  if (!username || !password || username.length < 3 || password.length < 4) {
    res.status(400).json({ error: "Имя пользователя от 3 символов, пароль от 4" });
    return;
  }
  const existing = await UserModel.findOne({ username });
  if (existing) {
    res.status(409).json({ error: "Это имя уже занято" });
    return;
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await UserModel.create({
    id: Date.now().toString(36),
    username,
    fullName: fullName?.trim() || username,
    passwordHash,
  });
  res.status(201).json({ data: { token: sign(user.id), user } });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body as AuthBody;
  const user = await UserModel.findOne({ username });
  if (!user || !(await bcrypt.compare(password ?? "", user.passwordHash))) {
    res.status(401).json({ error: "Неверное имя пользователя или пароль" });
    return;
  }
  res.json({ data: { token: sign(user.id), user } });
});

declare module "express-serve-static-core" {
  interface Request {
    userId?: string;
  }
}

router.get("/me", async (req: Request, res) => {
  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) {
    res.status(401).json({ error: "Нет токена" });
    return;
  }
  try {
    const { id } = jwt.verify(token, SECRET) as { id: string };
    const user = await UserModel.findOne({ id });
    if (!user) throw new Error();
    res.json({ data: { user } });
  } catch {
    res.status(401).json({ error: "Сессия истекла" });
  }
});

export default router;
