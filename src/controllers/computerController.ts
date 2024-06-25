import { Request, Response } from "express";
import { Computer } from "../types/Computer.js";
import {
    insert,
    findAll,
    findOne,
    deleteOne,
    updateOne,
} from "../utils/queries.js";

export class ComputerController {
    async createComputer(req: Request, res: Response) {
        try {
            const {
                brand,
                model,
                price,
                owner,
                productId,
                companyId,
            }: Computer = req.body;

            if (
                !brand ||
                !model ||
                !price ||
                !owner ||
                !productId ||
                !companyId
            ) {
                return res.status(400).json({
                    message: "Missing required fields",
                });
            }

            const computer = await insert("computer", {
                brand,
                model,
                price,
                owner,
                productId,
                companyId,
            });
            return res.status(201).json({
                computer,
                message: "Computer created successfully",
            });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
    async getAllComputers(req: Request, res: Response) {
        try {
            const computers = await findAll("computer");
            return res.status(200).json({
                computers,
            });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
    async getComputerById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const numberId = Number(id);
            const computer = await findOne("computer", numberId);

            if (!computer) {
                return res.status(404).json({
                    message: "Computer not found",
                });
            }

            return res.status(200).json({
                computer,
            });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
    async updateComputer(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const numberId = Number(id);

            const {
                brand,
                model,
                price,
                owner,
                productId,
                companyId,
            }: Computer = req.body;

            if (
                !brand ||
                !model ||
                !price ||
                !owner ||
                !productId ||
                !companyId
            ) {
                return res.status(400).json({
                    message: "Missing required fields",
                });
            }

            const computer = await updateOne("computer", numberId, {
                brand,
                model,
                price,
                owner,
                productId,
                companyId,
            });
            return res.status(200).json({
                computer,
                message: "Computer updated successfully",
            });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
    async deleteComputer(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const numberId = Number(id);
            const computer = await deleteOne("computer", numberId);
            return res.status(200).json({
                computer,
                message: "Computer deleted successfully",
            });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
}
