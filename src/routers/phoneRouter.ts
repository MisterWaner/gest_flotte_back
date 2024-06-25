import { Router } from "express";
import { PhoneController } from "../controllers/phoneController.js";

export const phoneRouter = Router();

const phoneController = new PhoneController();

phoneRouter.post("/", phoneController.createPhone);
phoneRouter.get("/", phoneController.getAllPhones);
phoneRouter.get("/:id", phoneController.getPhoneById);
phoneRouter.put("/:id", phoneController.updatePhone);
phoneRouter.delete("/:id", phoneController.deletePhone);
