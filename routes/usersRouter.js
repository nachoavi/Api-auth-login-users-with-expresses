import { Router } from "express";
import { usersController } from "../controllers/usersController.js";
import {
  validateRegister,
  validateLogin,
  authMiddleware,
} from "../middlewares/authVerifications.js";

export const userRouter = Router();

userRouter.post(
  "/register",
  validateRegister,
  usersController.registerUserController,
);
userRouter.post("/login", validateLogin, usersController.loginUserController);

userRouter.get("/profile", authMiddleware, usersController.getProfile);
