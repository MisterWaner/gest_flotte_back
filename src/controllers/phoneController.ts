import { Request, Response } from "express";
import { Phone } from "../types/Phone.js";
import {
    insert,
    findAll,
    findOne,
    deleteOne,
    updateOne,
} from "../utils/queries.js";

export class PhoneController {
    async createPhone(req: Request, res: Response) {
        try {
            const {
                brand,
                model,
                imei,
                network,
                price,
                number,
                owner,
                productId,
                companyId,
            }: Phone = req.body;

            if (
                !brand ||
                !model ||
                !imei ||
                !network ||
                !price ||
                !number ||
                !owner ||
                !productId ||
                !companyId
            ) {
                return res.status(400).json({
                    message: "Missing required fields",
                });
            }

            const phone = await insert("phone", {
                brand,
                model,
                imei,
                network,
                price,
                number,
                owner,
                productId,
                companyId,
            });
            return res.status(201).json({
                phone,
                message: "Phone created successfully",
            });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
    async getAllPhones(req: Request, res: Response) {
        try {
            const phones = await findAll("phone");
            return res.status(200).json({
                phones,
            });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
    async getPhoneById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const numberId = Number(id);
            const phone = await findOne("phone", numberId);

            if (!phone) {
                return res.status(404).json({
                    message: "Phone not found",
                });
            }

            return res.status(200).json({
                phone,
            });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
    async updatePhone(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const numberId = Number(id);

            const {
                brand,
                model,
                imei,
                network,
                price,
                number,
                owner,
                productId,
                companyId,
            }: Phone = req.body;

            if (
                !brand ||
                !model ||
                !imei ||
                !network ||
                !price ||
                !number ||
                !owner ||
                !productId ||
                !companyId
            ) {
                return res.status(400).json({
                    message: "Missing required fields",
                });
            }

            const phone = await updateOne("phone", numberId, {
                brand,
                model,
                imei,
                network,
                price,
                number,
                owner,
                productId,
                companyId,
            });
            return res.status(200).json({
                phone,
                message: "Phone updated successfully",
            });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
    async deletePhone(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const numberId = Number(id);
            const phone = await deleteOne("phone", numberId);
            return res.status(200).json({
                phone,
                message: "Phone deleted successfully",
            });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
}
