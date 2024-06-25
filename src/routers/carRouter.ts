import { Router } from "express";
import { CarController } from "../controllers/carController.js";

const carController = new CarController();

export const carRouter = Router();

carRouter.post("/car", carController.createCar);
carRouter.get("/car", carController.getAllCars);
carRouter.get("/car/:id", carController.getCarById);
carRouter.put("/car/:id", carController.updateCar);
carRouter.delete("/car/:id", carController.deleteCar);
