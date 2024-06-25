import { Router } from "express";
import { ComputerController } from "../controllers/computerController.js";

const computerController = new ComputerController();

export const computerRouter = Router();

computerRouter.post("/computer", computerController.createComputer);
computerRouter.get("/computer", computerController.getAllComputers);
computerRouter.get("/computer/:id", computerController.getComputerById);
computerRouter.put("/computer/:id", computerController.updateComputer);
computerRouter.delete("/computer/:id", computerController.deleteComputer);