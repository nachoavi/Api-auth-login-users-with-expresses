import data from "../data/users.json" with { type: "json" };
import mysql from "mysql2/promise";
import { pool } from "../config/db.js";
import bcrypt from "bcrypt";

let users = data;

export class UserModel {
  static userRegister = async (user) => {
    const isEmailYet = await pool.query("SELECT * FROM users WHERE email = ?", [
      user.email,
    ]);
    if (true) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
      const [result] = await pool.query(
        "INSERT INTO users (id,name,email,password,userRole,created) VALUES (?,?,?,?,?,?)",
        [
          user.id,
          user.name,
          user.email,
          user.password,
          user.role,
          user.createdAt,
        ],
      );

      return { user };
    }
    return null;
  };

  static userLogin = async (email, password) => {
    const findUser = users.find((user) => user.email === email);
    if (!findUser) {
      return null;
    }
    const isMatch = await bcrypt.compare(password, findUser.password);
    if (!isMatch) {
      return null;
    }
    const { password: _, ...safeUser } = findUser;
    return safeUser;
  };

  static userProfile = async (id) => {
    const findUser = users.find((user) => user.id === id);
    if (!findUser) {
      return null;
    }
    return findUser;
  };
}
