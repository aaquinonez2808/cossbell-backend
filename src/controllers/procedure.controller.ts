import { ProcedimientoService } from "./../services/procedure.service";
import { Request, Response } from "express";

import { CreateProcedimientoDto } from "../dto/procedure/Create-procedure.dto";
import { UpdateProcedimientoDto } from "../dto/procedure/Update-procedure.dto";
import { ResponseHandler } from "../config/Response";
import { CustomError } from "../config/errors/custom.error";
import { CreateProcedimientoDetalleDto } from "../dto/procedureDetail/Create-procedureDetail.dto";
import { ProcedimientoDetalleService } from "../services/procedureDetail.service";
import { PaginationDto } from "../dto/shared/pagination.dto";

export class ProcedureController {
  constructor(
    private readonly procedureService: ProcedimientoService,
    private readonly procedureDetailService: ProcedimientoDetalleService
  ) {}

  createProcedure = async (req: Request, res: Response) => {
    const { procedimientosDetalleBody } = req.body;
    const [error, createProcedureDto] = CreateProcedimientoDto.create(req.body);
    console.log(error);
    if (error) return ResponseHandler.sendErrorResponse(res, error);
    console.log(createProcedureDto);
    try {
      const procedimineto = await this.procedureService.createProcedimiento(
        createProcedureDto!
      );
      console.log(procedimineto);
      const createProcedimientosDetalleDTo: CreateProcedimientoDetalleDto[] =
        procedimientosDetalleBody.map((procedimientoDetalle: any) => {
          const [error, createProcedimientoDetalleDto] =
            CreateProcedimientoDetalleDto.create({
              ...procedimientoDetalle,
              id_procedimiento: procedimineto.id,
            });
          if (error) ResponseHandler.sendErrorResponse(res, error);
          return createProcedimientoDetalleDto!;
        });
      const procedimientosDetalle = await Promise.all(
        createProcedimientosDetalleDTo.map((procedimientoDetalle) =>
          this.procedureDetailService.createProcedimientoDetalle(
            procedimientoDetalle
          )
        )
      );
      const procedimientoNuevo = {
        ...procedimineto,
        procedimientosDetalle,
      };
      ResponseHandler.sendCreatedResponse(
        res,
        procedimientoNuevo,
        "Procedure successfully created"
      );
    } catch (error) {
      ResponseHandler.sendErrorResponse(res, error);
    }
  };

  getProcedures = (req: Request, res: Response) => {
    const { limit = 10, page = 1 } = req.query;
    const [error, paginationDto] = PaginationDto.create(+limit, +page);
    if (error) return res.status(400).json({ error: error });
    this.procedureService
      .getProcedimientos(paginationDto!)
      .then((procedures) => {
        ResponseHandler.sendSuccessResponse(
          res,
          procedures,
          "Procedures retrieved successfully"
        );
      })
      .catch((error) => {
        ResponseHandler.sendErrorResponse(res, error);
      });
  };

  getProcedure = (req: Request, res: Response) => {
    const procedureId = parseInt(req.params.id);
    if (!procedureId || isNaN(Number(procedureId)))
      ResponseHandler.sendErrorResponse(
        res,
        CustomError.badRequest("ID IS INVALID")
      );
    this.procedureService
      .getProcedimiento(procedureId)
      .then((procedure) => {
        ResponseHandler.sendSuccessResponse(
          res,
          procedure,
          "Procedure retrieved successfully"
        );
      })
      .catch((error) => {
        ResponseHandler.sendErrorResponse(res, error);
      });
  };

  updateProcedure = (req: Request, res: Response) => {
    const procedureId = parseInt(req.params.id);
    const [error, updateProcedureDto] = UpdateProcedimientoDto.create({
      id_procedimiento: procedureId,
      ...req.body,
    });
    if (error) return ResponseHandler.sendErrorResponse(res, error);

    this.procedureService
      .updateProcedimiento(updateProcedureDto!)
      .then((updatedProcedure) => {
        ResponseHandler.sendSuccessResponse(
          res,
          updatedProcedure,
          "Procedure updated successfully"
        );
      })
      .catch((error) => {
        ResponseHandler.sendErrorResponse(res, error);
      });
  };

  deleteProcedure = (req: Request, res: Response) => {
    const procedureId = parseInt(req.params.id);
    if (!procedureId || isNaN(Number(procedureId)))
      ResponseHandler.sendErrorResponse(
        res,
        CustomError.badRequest("ID IS INVALID")
      );
    this.procedureService
      .deleteProcedimiento(procedureId)
      .then((deletedProcedure) => {
        ResponseHandler.sendSuccessResponse(
          res,
          deletedProcedure,
          "Procedure deleted successfully"
        );
      })
      .catch((error) => {
        ResponseHandler.sendErrorResponse(res, error);
      });
  };
}
