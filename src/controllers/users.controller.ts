import { Request, Response } from "express";
import { getAllUsers, getUserById } from "../models/users.js";

export const getUsers = async (_req: Request, res: Response) => {
  const users = await getAllUsers();
  res.json({ success: true, data: users });
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const user = await getUserById(id);

  if (!user) {
    res.status(404).json({
      success: false,
      error: "Пользователь не найден",
    });
    return;
  }

  res.json({ success: true, data: user });
};
