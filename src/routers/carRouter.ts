import { Router } from "express";
import { CarController } from "../controllers/carController.js";

const carController = new CarController();

export const carRouter = Router();

carRouter.post("/", carController.createCar);
carRouter.get("/", carController.getAllCars);
carRouter.get("/:id", carController.getCarById);
carRouter.put("/:id", carController.updateCar);
carRouter.delete("/:id", carController.deleteCar);
