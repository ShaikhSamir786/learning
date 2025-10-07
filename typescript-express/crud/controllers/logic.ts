import { Request, Response } from "express";
import { User as UserModel } from "../models/user-model";

//  Create
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.create({ name, email, password });
    console.log("🚀 ~ createUser ~ user:", user)
    res.status(201).json({ message: "User created", user });
    
  } catch (error) {
    res.status(400).json({ message: "Failed to create user", error });
  }
};

//  Read All
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    res.status(400).json({ message: "Failed to get users", error });
  }
};

//  Read One
export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: "Failed to get user", error });
  }
};

//  Update
export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User updated", user });
  } catch (error) {
    res.status(400).json({ message: "Failed to update user", error });
  }
};

//  Delete
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(400).json({ message: "Failed to delete user", error });
  }
};
