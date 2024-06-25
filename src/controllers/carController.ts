import { Request, Response } from "express";
import { Car } from "../types/Car.js";
import {
    insert,
    findAll,
    findOne,
    deleteOne,
    updateOne,
} from "../utils/queries.js";

export class CarController {
    async createCar(req: Request, res: Response) {
        try {
            const {
                brand,
                model,
                immatriculation,
                kilometers,
                motor,
                driver,
                price,
                productId,
                companyId,
            }: Car = req.body;

            if (
                !brand ||
                !model ||
                !immatriculation ||
                !kilometers ||
                !motor ||
                !driver ||
                !price ||
                !productId ||
                !companyId
            ) {
                return res.status(400).json({
                    message: "Missing required fields",
                });
            }

            const car = await insert("car", {
                brand,
                model,
                immatriculation,
                kilometers,
                motor,
                driver,
                price,
                productId,
                companyId,
            });
            return res.status(201).json({
                car,
                message: "Car created successfully",
            });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
    async getAllCars(req: Request, res: Response) {
        try {
            const cars = await findAll("car");
            return res.status(200).json({
                cars,
            });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
    async getCarById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const numberId = Number(id);
            const car = await findOne("car", numberId);

            if (!car) {
                return res.status(404).json({
                    message: "Car not found",
                });
            }

            return res.status(200).json({
                car,
            });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
    async updateCar(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const numberId = Number(id);

            const {
                brand,
                model,
                immatriculation,
                kilometers,
                motor,
                driver,
                price,
                productId,
                companyId,
            }: Car = req.body;

            if (
                !brand ||
                !model ||
                !immatriculation ||
                !kilometers ||
                !motor ||
                !driver ||
                !price ||
                !productId ||
                !companyId
            ) {
                return res.status(400).json({
                    message: "Missing required fields",
                });
            }

            const car = await updateOne("car", numberId, {
                brand,
                model,
                immatriculation,
                kilometers,
                motor,
                driver,
                price,
                productId,
                companyId,
            });
            return res.status(200).json({
                car,
                message: "Car updated successfully",
            });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
    async deleteCar(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const numberId = Number(id);
            const car = await deleteOne("car", numberId);
            return res.status(200).json({
                car,
                message: "Car deleted successfully",
            });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
}