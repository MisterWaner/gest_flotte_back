import { Router } from "express";
import { UserController } from "../controllers/userController.js";

const userController = new UserController();

export const userRouter = Router();
userRouter.get("/", userController.getAllUsers);
userRouter.get("/:id", userController.getUserById);
userRouter.post("/", userController.createUser);
userRouter.put("/:id", userController.updateUser);
userRouter.delete("/:id", userController.deleteUser);