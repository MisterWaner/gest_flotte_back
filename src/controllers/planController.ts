import { Request, Response } from "express";
import { Plan } from "../types/Plan.js";
import {
    insert,
    findAll,
    findOne,
    deleteOne,
    updateOne,
} from "../utils/queries.js";

export class PlanController {
    async createPlan(req: Request, res: Response) {
        try {
            const { title, description, price }: Plan = req.body;

            if (!title || !description || !price) {
                return res.status(400).json({
                    message: "Missing required fields",
                });
            }

            const plan = await insert("plan", { title, description, price });
            return res.status(201).json({
                plan,
                message: "Plan created successfully",
            });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async getAllPlans(req: Request, res: Response) {
        try {
            const plans = await findAll("plan");
            return res.status(200).json({
                plans,
            });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async getPlanById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const numberId = Number(id);
            const plan = await findOne("plan", numberId);

            if (!plan) {
                return res.status(404).json({
                    message: "Plan not found",
                });
            }

            return res.status(200).json({
                plan,
            });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async updatePlan(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const numberId = Number(id);

            const { title, description, price }: Plan = req.body;

            if (!title || !description || !price) {
                return res.status(400).json({
                    message: "Missing required fields",
                });
            }

            const plan = await updateOne("plan", numberId, { title, description, price });
            return res.status(200).json({
                plan,
                message: "Plan updated successfully",
            });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async deletePlan(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const numberId = Number(id);
            const plan = await deleteOne("plan", numberId);
            return res.status(200).json({
                plan,
                message: "Plan deleted successfully",
            });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
}
