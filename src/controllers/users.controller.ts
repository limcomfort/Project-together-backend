import { Request, Response } from "express";
import { getAllUsers, getUserById } from "../models/users.js";

export const getUsers = (req: Request, res: Response) => {
  const users = getAllUsers();
  res.json({ success: true, data: users });
};

export const getUser = (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const user = getUserById(id);

  if (!user) {
    res.status(404).json({
      success: false,
      error: "Пользователь не найден",
    });
    return;
  }

  res.json({ success: true, data: user });
};
