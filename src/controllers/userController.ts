import { Request, Response } from "express";
import { User } from "../types/User.js";
import {
    insert,
    findAll,
    findOne,
    updateOne,
    deleteOne,
} from "../utils/queries.js";

export class UserController {
    async createUser(req: Request, res: Response) {
        const { name, email, password, phoneNumber, companyId }: User =
            req.body;

        if (!name || !email || !password || !phoneNumber || !companyId) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const user = await insert("user", {
            name,
            email,
            password,
            phoneNumber,
            companyId,
        });

        return res
            .status(201)
            .json({ user, message: "User created successfully" });
    }

    async getAllUsers(req: Request, res: Response) {
        try {
            const users = await findAll("user");
            return res.status(200).json({
                users,
            });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async getUserById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const numberId = Number(id);
            const user = await findOne("user", numberId);

            if (!user) {
                return res.status(404).json({
                    message: "User not found",
                });
            }

            return res.status(200).json({
                user,
            });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const numberId = Number(id);

            const { name, email, password, phoneNumber, companyId }: User =
                req.body;

            if (!name || !email || !password || !phoneNumber || !companyId) {
                return res.status(400).json({ message: "Missing required fields" });
            }

            const user = await updateOne("user", numberId, {
                name,
                email,
                password,
                phoneNumber,
                companyId,
            });
            return res.status(200).json({
                user,
                message: "User updated successfully",
            });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const numberId = Number(id);
            const user = await deleteOne("user", numberId);
            return res.status(200).json({
                user,
                message: "User deleted successfully",
            });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
}
