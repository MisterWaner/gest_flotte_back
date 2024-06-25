import { Router } from "express";
import { SubscriptionController } from "../controllers/subscriptionController.js";

const subscriptionController = new SubscriptionController();

export const subscriptionRouter = Router();

subscriptionRouter.post("/subscription", subscriptionController.createSubscription);
subscriptionRouter.get("/subscription", subscriptionController.getAllSubscriptions);
subscriptionRouter.get("/subscription/:id", subscriptionController.getSubscriptionById);
subscriptionRouter.put("/subscription/:id", subscriptionController.updateSubscription);
subscriptionRouter.delete("/subscription/:id", subscriptionController.deleteSubscription);