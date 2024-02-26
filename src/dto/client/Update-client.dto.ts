export class UpdateClientDto {
  private constructor(
    public id_cliente: number,
    public nombre_cliente: string,
    public apellido_cliente: string,
    public cedula_cliente: string,
    public edad_cliente: number,
    public fecha_nacimiento_cliente: Date,
    public celular_cliente: string,
    public direccion_cliente: string
  ) {}

  get values() {
    const returnObj: { [key: string]: any } = {};

    if (this.nombre_cliente) returnObj.nombre = this.nombre_cliente;
    if (this.apellido_cliente) returnObj.apellido = this.apellido_cliente;
    if (this.cedula_cliente) returnObj.cedula = this.cedula_cliente;
    if (this.edad_cliente) returnObj.edad = this.edad_cliente;
    if (this.fecha_nacimiento_cliente)
      returnObj.fechaNacimineto = this.fecha_nacimiento_cliente;
    if (this.celular_cliente) returnObj.celular = this.celular_cliente;
    if (this.direccion_cliente) returnObj.direccion = this.direccion_cliente;

    return returnObj;
  }
  static create(object: { [key: string]: any }): [string?, UpdateClientDto?] {
    const {
      id_cliente,
      nombre_cliente,
      apellido_cliente,
      cedula_cliente,
      edad_cliente,
      fecha_nacimiento_cliente,
      celular_cliente,
      direccion_cliente,
    } = object;

    if (!id_cliente || isNaN(Number(id_cliente)))
      return ["Missing id parameter in url path"];

    return [
      undefined,
      new UpdateClientDto(
        id_cliente,
        nombre_cliente,
        apellido_cliente,
        cedula_cliente,
        edad_cliente,
        fecha_nacimiento_cliente,
        celular_cliente,
        direccion_cliente
      ),
    ];
  }
}
