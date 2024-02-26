import { Router } from "express";
import { ProductController } from "../controllers/product.controller";
import { ProductService } from "../services/product.service";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class ProductRoutes {
  static get routes(): Router {
    const router = Router();
    const productService = new ProductService();
    const productController = new ProductController(productService);

    router.post("/", productController.createProduct);
    router.get("/", productController.getProducts);
    router.get("/:id", productController.getProduct);
    router.put("/:id", productController.updateProduct);
    router.delete("/:id", productController.deleteProduct);

    return router;
  }
}
