import { Router } from "express";
import { SubscriptionController } from "../controllers/subscriptionController.js";

const subscriptionController = new SubscriptionController();

export const subscriptionRouter = Router();

subscriptionRouter.post("/", subscriptionController.createSubscription);
subscriptionRouter.get("/", subscriptionController.getAllSubscriptions);
subscriptionRouter.get("/:id", subscriptionController.getSubscriptionById);
subscriptionRouter.put("/:id", subscriptionController.updateSubscription);
subscriptionRouter.delete("/:id", subscriptionController.deleteSubscription);