import { CustomError } from "../config/errors/custom.error";
import { Procedimiento } from "../db/models/Procedure";
import { CreateProcedimientoDto } from "../dto/procedure/Create-procedure.dto";
import { UpdateProcedimientoDto } from "../dto/procedure/Update-procedure.dto";
import { PaginationDto } from "../dto/shared/pagination.dto";
import { PaginationEntity } from "../entities/paginationEntity";

export class ProcedimientoService {
  public async createProcedimiento(
    createProcedimientoDto: CreateProcedimientoDto
  ): Promise<Procedimiento> {
    try {
      const procedureNew = {
        fecha: createProcedimientoDto.fecha_procedimiento,
        cliente: { id: createProcedimientoDto.id_cliente },
        indicaciones: createProcedimientoDto.indicaciones_procedimiento,
        descripcion: createProcedimientoDto.descripcion_procedimiento,
        precio: createProcedimientoDto.precio_procedimiento,
      };
      const procedimiento = Procedimiento.create({ ...procedureNew });
      await procedimiento.save();
      return procedimiento;
    } catch (error) {
      throw CustomError.internal(` ${error}`);
    }
  }

  public async getProcedimientos(
    paginationDto: PaginationDto
  ): Promise<PaginationEntity<Procedimiento>> {
    try {
      const [procedimientos, total] = await Procedimiento.findAndCount({
        relations: ["cliente"],
        skip: (paginationDto.page - 1) * paginationDto.limit,
        take: paginationDto.limit,
      });

      const data = PaginationEntity.fromPaginationDto({
        datosTotal: total,
        paginationDto,
        datos: procedimientos,
        nombreData: "procedimientos",
      });

      return data;
    } catch (error: unknown) {
      throw CustomError.internal(` ${error}`);
    }
  }

  public async getProcedimiento(id: number): Promise<Procedimiento> {
    try {
      const procedimiento = await Procedimiento.findOneOrFail({
        where: { id },
        relations: ["cliente"],
      });
      return procedimiento;
    } catch (error) {
      throw CustomError.internal(` ${error}`);
    }
  }

  public async deleteProcedimiento(id: number): Promise<Procedimiento> {
    const procedimiento = await Procedimiento.findOne({ where: { id } });
    if (!procedimiento) throw CustomError.notFound("Procedure not found");

    await procedimiento.remove();
    return procedimiento;
  }

  public async updateProcedimiento(
    updateProcedimientoDto: UpdateProcedimientoDto
  ): Promise<Procedimiento> {
    try {
      const procedimiento = await Procedimiento.findOne({
        where: { id: updateProcedimientoDto.id_cliente },
      });
      if (!procedimiento) throw CustomError.notFound("Procedure not found");
      Procedimiento.merge(procedimiento, updateProcedimientoDto.values);
      await procedimiento.save();
      return procedimiento;
    } catch (error) {
      throw CustomError.internal(` ${error}`);
    }
  }
}
