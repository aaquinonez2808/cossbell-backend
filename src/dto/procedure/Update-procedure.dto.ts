export class UpdateProcedimientoDto {
  private constructor(
    public id_procedimiento: number,
    public id_cliente: number,
    public fecha_procedimiento: Date,
    public descripcion_procedimiento: string,
    public indicaciones_procedimiento: string,
    public precio_procedimiento: number
  ) {}

  get values() {
    const returnObj: { [key: string]: any } = {};

    if (this.id_cliente) returnObj.id_cliente = this.id_cliente;
    if (this.fecha_procedimiento) returnObj.fecha = this.fecha_procedimiento;
    if (this.descripcion_procedimiento)
      returnObj.descripcion = this.descripcion_procedimiento;
    if (this.indicaciones_procedimiento)
      returnObj.indicaciones = this.indicaciones_procedimiento;

    if (this.precio_procedimiento)
      returnObj.precio_procedimiento = this.precio_procedimiento;

    return returnObj;
  }

  static create(object: {
    [key: string]: any;
  }): [string?, UpdateProcedimientoDto?] {
    const {
      id_procedimiento,
      id_cliente,
      fecha_procedimiento,
      descripcion_procedimiento,
      indicaciones_procedimiento,
      precio_procedimiento,
    } = object;

    if (!id_procedimiento || isNaN(Number(id_procedimiento)))
      return ["Missing id_procedimiento parameter in url path"];

    return [
      undefined,
      new UpdateProcedimientoDto(
        id_procedimiento,
        id_cliente,
        fecha_procedimiento,
        descripcion_procedimiento,
        indicaciones_procedimiento,
        precio_procedimiento
      ),
    ];
  }
}
