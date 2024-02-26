export class UpdateProcedimientoDetalleDto {
  private constructor(
    public id_procedimiento_detalle: number,
    public id_procedimineto: number,
    public id_producto: number,
    public cantidad_procedure_detalle: number
  ) {}

  get values() {
    const returnObj: { [key: string]: any } = {};

    if (this.cantidad_procedure_detalle)
      returnObj.cantidad = this.cantidad_procedure_detalle;

    if (this.id_procedimineto)
      returnObj.id_procedimineto = this.id_procedimineto;

    if (this.id_producto) returnObj.id_producto = this.id_producto;

    return returnObj;
  }

  static create(object: {
    [key: string]: any;
  }): [string?, UpdateProcedimientoDetalleDto?] {
    const {
      id_procedimiento_detalle,
      cantidad_procedure_detalle,
      id_procedimiento,
      id_producto,
    } = object;

    if (!id_procedimiento_detalle || isNaN(Number(id_procedimiento_detalle)))
      return ["Missing id_procedimiento_detalle parameter"];

    return [
      undefined,
      new UpdateProcedimientoDetalleDto(
        id_procedimiento_detalle,
        id_procedimiento,
        id_producto,
        cantidad_procedure_detalle
      ),
    ];
  }
}
