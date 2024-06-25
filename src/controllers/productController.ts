import { Request, Response } from "express";
import { Product } from "../types/Product.js";
import {
    insert,
    findAll,
    findOne,
    deleteOne,
    updateOne,
} from "../utils/queries.js";

export class ProductController {
    async createProduct(req: Request, res: Response) {
        try {
            const { type }: Product = req.body;

            if (!type) {
                return res.status(400).json({
                    message: "Missing required fields",
                });
            }

            const product = await insert("product", { type });
            return res.status(201).json({
                product,
                message: "Product created successfully",
            });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async getAllProducts(req: Request, res: Response) {
        try {
            const products = await findAll("product");
            return res.status(200).json({
                products,
            });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async getProductById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const numberId = Number(id);
            const product = await findOne("product", numberId);

            if (!product) {
                return res.status(404).json({
                    message: "Product not found",
                });
            }

            return res.status(200).json({
                product,
            });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async updateProduct(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const numberId = Number(id);

            const { type }: Product = req.body;

            if (!type) {
                return res.status(400).json({
                    message: "Missing required fields",
                });
            }

            const product = await updateOne("product", numberId, { type });
            return res.status(200).json({
                product,
                message: "Product updated successfully",
            });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async deleteProduct(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const numberId = Number(id);
            const product = await deleteOne("product", numberId);
            return res.status(200).json({
                product,
                message: "Product deleted successfully",
            });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
}
