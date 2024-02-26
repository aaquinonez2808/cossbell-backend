import { Router } from "express";
import { ProcedureController } from "../controllers/procedure.controller";
import { ProcedimientoService } from "../services/procedure.service";
import { ProcedimientoDetalleService } from "../services/procedureDetail.service";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class ProcedureRoutes {
  static get routes(): Router {
    const router = Router();
    const procedureService = new ProcedimientoService();
    const procedureDetailService = new ProcedimientoDetalleService();
    const procedureController = new ProcedureController(
      procedureService,
      procedureDetailService
    );

    router.post("/", (req, res) =>
      procedureController.createProcedure(req, res)
    );
    router.get("/", procedureController.getProcedures);
    router.get("/:id", procedureController.getProcedure);
    router.put("/:id", procedureController.updateProcedure);
    router.delete("/:id", procedureController.deleteProcedure);

    return router;
  }
}
