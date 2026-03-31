import { json } from "express";
import { UserModel } from "../models/usersModel";
import bcrypt from "bcrypt";

export class usersController {
  static registerUserController = async (req, res) => {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res
        .status(400)
        .json({ message: "name,email,password and role is required" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: crypto.randomUUID(),
      name: email,
      password: hashedPassword,
      role: role,
    };
    const user = await UserModel.userRegister(newUser);
    return res.status(200).json(user);
  };

  static loginUserController = async (req, res) => {
    const { email, password } = req.body;
    const loginUser = await UserModel.loginUser(email, password);
    if (loginUser === false) {
      return res.status(401).json({ message: "Usuario invalido" });
    }
    return res
      .status(200)
      .json(
        { message: "Login success" },
        { user: { id: loginUser.id, email: loginUser.email } },
      );
  };
}
