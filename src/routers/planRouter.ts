import { Router } from "express";
import { PlanController } from "../controllers/planController.js";

const planController = new PlanController();

export const planRouter = Router();

planRouter.get("/", planController.getAllPlans);
planRouter.get("/:id", planController.getPlanById);
planRouter.post("/", planController.createPlan);
planRouter.put("/:id", planController.updatePlan);
planRouter.delete("/:id", planController.deletePlan);