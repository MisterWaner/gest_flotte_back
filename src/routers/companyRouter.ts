import { Router } from "express";
import { CompanyController } from "../controllers/companyController.js";

const companyController = new CompanyController();

export const companyRouter = Router();

companyRouter.get("/", companyController.getAllCompanies);
companyRouter.get("/:id", companyController.getCompanyById);
companyRouter.post("/", companyController.createCompany);
companyRouter.put("/:id", companyController.updateCompany);
companyRouter.delete("/:id", companyController.deleteCompany);