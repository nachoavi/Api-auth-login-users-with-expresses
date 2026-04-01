import { json } from "express";
import { UserModel } from "../models/usersModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET = process.env.JWT_SECRET;

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

    const token = jwt.sign({ id: loginUser.id, role: loginUser.role }, SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      message: "Login success",
      user: { id: loginUser.id, email: loginUser.email, role: loginUser.role },
      token: token,
    });
  };

  static getProfile = async (req, res) => {
    const profile = await UserModel.userProfile(req.user.id);
    if (!profile) {
      return res.status(400).json({ message: "Perfil no econtrado" });
    }
    return res.status(200).json(profile);
  };
}
