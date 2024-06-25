import { Request, Response } from "express";
import { Company } from "../types/Company.js";
import {
    insert,
    findAll,
    findOne,
    deleteOne,
    updateOne,
} from "../utils/queries.js";

export class CompanyController {
    async createCompany(req: Request, res: Response) {
        try {
            const { name, city, sector, planId, size }: Company = req.body;

            if (!name || !city || !sector || !planId || !size) {
                return res.status(400).json({
                    message: "Missing required fields",
                });
            }

            const company = await insert("company", {
                name,
                city,
                sector,
                planId,
                size,
            });
            return res.status(201).json({
                company,
                message: "Company created successfully",
            });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
    async getAllCompanies(req: Request, res: Response) {
        try {
            const companies = await findAll("company");
            return res.status(200).json({
                companies,
            });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
    async getCompanyById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const numberId = Number(id);
            const company = await findOne("company", numberId);

            if (!company) {
                return res.status(404).json({
                    message: "Company not found",
                });
            }

            return res.status(200).json({
                company,
            });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
    async updateCompany(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const numberId = Number(id);

            const { name, city, sector, planId, size }: Company = req.body;

            if (!name || !city || !sector || !planId || !size) {
                return res.status(400).json({
                    message: "Missing required fields",
                });
            }

            const company = await updateOne("company", numberId, {
                name,
                city,
                sector,
                planId,
                size,
            });
            return res.status(200).json({
                company,
                message: "Company updated successfully",
            });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
    async deleteCompany(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const numberId = Number(id);
            const company = await deleteOne("company", numberId);
            return res.status(200).json({
                company,
                message: "Company deleted successfully",
            });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
}
