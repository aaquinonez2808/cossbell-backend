import { CustomError } from "../config/errors/custom.error";

import { ProcedimientoDetalle } from "../db/models/ProcedureDetail";

import { CreateProcedimientoDetalleDto } from "../dto/procedureDetail/Create-procedureDetail.dto";
import { UpdateProcedimientoDetalleDto } from "../dto/procedureDetail/Update-procedureDetail.dto";

export class ProcedimientoDetalleService {
  public async createProcedimientoDetalle(
    createProcedimientoDetalle: CreateProcedimientoDetalleDto
  ): Promise<ProcedimientoDetalle> {
    try {
      const procedureDetailNew = {
        producto: { id: createProcedimientoDetalle.id_producto },
        procedimiento: { id: createProcedimientoDetalle.id_procedimiento },
        cantidad: createProcedimientoDetalle.cantidad_procedure_detalle,
      };
      const procedimientoDetalle = ProcedimientoDetalle.create({
        ...procedureDetailNew,
      });
      await procedimientoDetalle.save();
      return procedimientoDetalle;
    } catch (error) {
      throw CustomError.internal(` ${error}`);
    }
  }

  public async getProcedimientosDetalle(): Promise<ProcedimientoDetalle[]> {
    try {
      const procedimientosDetalle = await ProcedimientoDetalle.find({
        relations: ["producto"],
      });

      return procedimientosDetalle;
    } catch (error: unknown) {
      throw CustomError.internal(` ${error}`);
    }
  }

  public async getProcedimientoDetalle(
    id: number
  ): Promise<ProcedimientoDetalle> {
    try {
      const procedimientoDetalle = await ProcedimientoDetalle.findOneOrFail({
        where: { id },
        relations: ["producto"],
      });
      return procedimientoDetalle;
    } catch (error) {
      throw CustomError.internal(` ${error}`);
    }
  }

  public async deleteProcedimientoDetalle(
    id: number
  ): Promise<ProcedimientoDetalle> {
    const procedimientoDetalle = await ProcedimientoDetalle.findOne({
      where: { id },
    });
    if (!procedimientoDetalle)
      throw CustomError.notFound("Procedure not found");

    await procedimientoDetalle.remove();
    return procedimientoDetalle;
  }

  public async updateProcedimientoDetalle(
    updateProcedimientoDetalleDto: UpdateProcedimientoDetalleDto
  ): Promise<ProcedimientoDetalle> {
    try {
      const procedimientoDetalle = await ProcedimientoDetalle.findOne({
        where: { id: updateProcedimientoDetalleDto.id_procedimiento_detalle },
      });
      if (!procedimientoDetalle)
        throw CustomError.notFound("Procedure not found");
      ProcedimientoDetalle.merge(
        procedimientoDetalle,
        updateProcedimientoDetalleDto.values
      );
      await procedimientoDetalle.save();
      return procedimientoDetalle;
    } catch (error) {
      throw CustomError.internal(` ${error}`);
    }
  }
}
