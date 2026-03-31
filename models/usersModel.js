import data from "../data/users.json" with { type: "json" };
import bcrypt from "bcrypt";

let users = data;

export class UserModel {
  static userRegister = async (user) => {
    const isEmailYet = users.find((userYet) => userYet.email === user.email);
    if (!isEmailYet) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
      users.push(user);
      return user;
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
}
