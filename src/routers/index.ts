import { Router } from "express";
import { planRouter } from "./planRouter.js";
import { companyRouter } from "./companyRouter.js";
import { userRouter } from "./userRouter.js";

export const router = Router();
router.use("/plan", planRouter);
router.use("/company", companyRouter);
router.use("/user", userRouter);