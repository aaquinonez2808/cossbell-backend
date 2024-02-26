export class CreateProcedimientoDto {
  private constructor(
    public id_cliente: number,
    public fecha_procedimiento: Date,
    public descripcion_procedimiento: string,
    public indicaciones_procedimiento: string,
    public precio_procedimiento: number
  ) {}

  static create(object: {
    [key: string]: any;
  }): [string?, CreateProcedimientoDto?] {
    const {
      id_cliente,
      fecha_procedimiento,
      descripcion_procedimiento,
      indicaciones_procedimiento,
      precio_procedimiento,
    } = object;

    if (!id_cliente) return ["Missing id_cliente parameter"];
    if (!fecha_procedimiento) return ["Missing fecha_procedimiento parameter"];
    if (!descripcion_procedimiento)
      return ["Missing descripcion_procedimiento parameter"];
    if (!indicaciones_procedimiento)
      return ["Missing indicaciones_procedimiento parameter"];

    if (!precio_procedimiento)
      return ["Missing precio_procedimiento parameter"];

    return [
      undefined,
      new CreateProcedimientoDto(
        id_cliente,
        fecha_procedimiento,
        descripcion_procedimiento,
        indicaciones_procedimiento,
        precio_procedimiento
      ),
    ];
  }
}
