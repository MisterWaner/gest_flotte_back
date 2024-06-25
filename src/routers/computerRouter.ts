import { Router } from "express";
import { ComputerController } from "../controllers/computerController.js";

const computerController = new ComputerController();

export const computerRouter = Router();

computerRouter.post("/", computerController.createComputer);
computerRouter.get("/", computerController.getAllComputers);
computerRouter.get("/:id", computerController.getComputerById);
computerRouter.put("/:id", computerController.updateComputer);
computerRouter.delete("/:id", computerController.deleteComputer);