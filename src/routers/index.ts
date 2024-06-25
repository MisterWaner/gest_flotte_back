import { Router } from "express";
import { planRouter } from "./planRouter.js";
import { companyRouter } from "./companyRouter.js";
import { userRouter } from "./userRouter.js";
import { productRouter } from "./productRouter.js";
import { subscriptionRouter } from "./subscriptionRouter.js";
import { phoneRouter } from "./phoneRouter.js";
import { carRouter } from "./carRouter.js";
import { computerRouter } from "./computerRouter.js";

export const router = Router();

router.use("/plan", planRouter);
router.use("/company", companyRouter);
router.use("/user", userRouter);
router.use("/product", productRouter);
router.use("/subscription", subscriptionRouter);
router.use("/phone", phoneRouter);
router.use("/car", carRouter);
router.use("/computer", computerRouter);
