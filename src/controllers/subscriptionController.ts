import { Request, Response } from "express";
import { Subscription } from "../types/Subscription.js";
import {
    insert,
    findAll,
    findOne,
    deleteOne,
    updateOne,
} from "../utils/queries.js";

export class SubscriptionController {
    async createSubscription(req: Request, res: Response) {
        try {
            const { companyId, productId, quantity }: Subscription = req.body;

            if (!companyId || !productId || !quantity) {
                return res.status(400).json({
                    message: "Missing required fields",
                });
            }

            const subscription = await insert("subscription", { companyId, productId, quantity });
            return res.status(201).json({
                subscription,
                message: "Subscription created successfully",
            });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async getAllSubscriptions(req: Request, res: Response) {
        try {
            const subscriptions = await findAll("subscription");
            return res.status(200).json({
                subscriptions,
            });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async getSubscriptionById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const numberId = Number(id);
            const subscription = await findOne("subscription", numberId);

            if (!subscription) {
                return res.status(404).json({
                    message: "Subscription not found",
                });
            }

            return res.status(200).json({
                subscription,
            });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
    async updateSubscription(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const numberId = Number(id);

            const { companyId, productId, quantity }: Subscription = req.body;

            if (!companyId || !productId || !quantity) {
                return res.status(400).json({
                    message: "Missing required fields",
                });
            }

            const subscription = await updateOne("subscription", numberId, { companyId, productId, quantity });
            return res.status(200).json({
                subscription,
                message: "Subscription updated successfully",
            });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async deleteSubscription(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const numberId = Number(id);
            const subscription = await deleteOne("subscription", numberId);
            return res.status(200).json({
                subscription,
                message: "Subscription deleted successfully",
            });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
}