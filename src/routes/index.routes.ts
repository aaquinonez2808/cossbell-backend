import { Router } from "express";
import { AuthRoutes } from "./user.routes";
import { ClientRoutes } from "./cliente.routes";
import { ProductRoutes } from "./product.routes";
import { ProcedureRoutes } from "./procedimiento.routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/clients", ClientRoutes.routes);
    router.use("/api/products", ProductRoutes.routes);

    router.use("/api/auth", AuthRoutes.routes);
    router.use("/api/procedures", ProcedureRoutes.routes);

    return router;
  }
}
