import { users, User } from "../data.js";

export function getAllUsers(): User[] {
  return users;
}

export function getUserById(id: string): User | undefined {
  return users.find((user) => user.id === id);
}
