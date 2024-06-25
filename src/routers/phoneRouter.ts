import { Router } from "express";
import { PhoneController } from "../controllers/phoneController.js";

export const phoneRouter = Router();

const phoneController = new PhoneController();

phoneRouter.post("/phone", phoneController.createPhone);
phoneRouter.get("/phone", phoneController.getAllPhones);
phoneRouter.get("/phone/:id", phoneController.getPhoneById);
phoneRouter.put("/phone/:id", phoneController.updatePhone);
phoneRouter.delete("/phone/:id", phoneController.deletePhone);
