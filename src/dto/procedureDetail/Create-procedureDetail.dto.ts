export class CreateProcedimientoDetalleDto {
  constructor(
    public id_procedimiento: number,
    public id_producto: number,
    public cantidad_procedure_detalle: number
  ) {}

  static create(object: {
    [key: string]: any;
  }): [string?, CreateProcedimientoDetalleDto?] {
    const { id_procedimiento, id_producto, cantidad_procedure_detalle } =
      object;

    if (!id_procedimiento || isNaN(id_procedimiento))
      return ["Missing or invalid id_procedimiento parameter"];
    if (!id_producto || isNaN(id_producto))
      return ["Missing or invalid id_producto parameter"];
    if (!cantidad_procedure_detalle || isNaN(cantidad_procedure_detalle))
      return ["Missing or invalid cantidad_procedure_detalle parameter"];

    return [
      undefined,
      new CreateProcedimientoDetalleDto(
        id_procedimiento,
        id_producto,
        cantidad_procedure_detalle
      ),
    ];
  }
}
