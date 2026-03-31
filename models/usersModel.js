import data from "../data/users.json" with { type: "json" };
import bcrypt from "bcrypt";

let users = data;

export class UserModel {
  static userRegister = async (user) => {
    users.push(user);
    return user;
  };

  static userLogin = async (email, password) => {
    const findUser = users.find((user) => user.email === email);
    const isMatch = await bcrypt.compare(password, findUser.password);
    if (isMatch === true) {
      return findUser;
    }
    return false;
  };
}
