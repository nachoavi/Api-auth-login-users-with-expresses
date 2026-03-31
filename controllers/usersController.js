import { json } from "express";
import { UserModel } from "../models/usersModel.js";
import bcrypt from "bcrypt";

export class usersController {
  static registerUserController = async (req, res) => {
    const { name, email, password, role } = req.body;
    const newUser = {
      id: crypto.randomUUID(),
      name: name,
      email: email,
      password: password,
      role: role,
      createdAt: new Date(),
    };
    const user = await UserModel.userRegister(newUser);
    if (!user) {
      return res.status(400).json({ message: "Email is already created" });
    }
    return res.status(200).json(user);
  };

  static loginUserController = async (req, res) => {
    const { email, password } = req.body;
    const loginUser = await UserModel.userLogin(email, password);
    if (!loginUser) {
      return res.status(401).json({ message: "Usuario invalido" });
    }
    return res.status(200).json({
      message: "Login success",
      user: { id: loginUser.id, email: loginUser.email },
    });
  };
}
