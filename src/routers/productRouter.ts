import { Router } from "express";
import { ProductController } from "../controllers/productController.js";

export const productRouter = Router();

const productController = new ProductController();

productRouter.post("/product", productController.createProduct);
productRouter.get("/product", productController.getAllProducts);
productRouter.get("/product/:id", productController.getProductById);
productRouter.put("/product/:id", productController.updateProduct);
productRouter.delete("/product/:id", productController.deleteProduct);

