import { Router } from "express";
import { usersController } from "../controllers/usersController.js";
import {
  validateRegister,
  validateLogin,
} from "../middlewares/authVerifications.js";

export const userRouter = Router();

userRouter.post(
  "/register",
  validateRegister,
  usersController.registerUserController,
);
userRouter.post("/login", validateLogin, usersController.loginUserController);
