import { Router } from "express";
import { ClientController } from "../controllers/client.controller";
import { ClientService } from "../services/client.service";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class ClientRoutes {
  static get routes(): Router {
    const router = Router();
    const clientService = new ClientService();
    const clientController = new ClientController(clientService);

    router.post("/", clientController.createClient);
    router.get("/", clientController.getClients);
    router.get("/:id", clientController.getClient);
    router.put("/:id", clientController.updateClient);
    router.delete("/:id", clientController.deleteClient);

    return router;
  }
}
