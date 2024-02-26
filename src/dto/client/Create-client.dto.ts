export class CreateClientDto {
  private constructor(
    public nombre_cliente: string,
    public apellido_cliente: string,
    public cedula_cliente: string,
    public edad_cliente: number,
    public fecha_nacimiento_cliente: Date,
    public celular_cliente: string,
    public direccion_cliente: string
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateClientDto?] {
    const {
      nombre_cliente,
      apellido_cliente,
      cedula_cliente,
      edad_cliente,
      fecha_nacimiento_cliente,
      celular_cliente,
      direccion_cliente,
    } = object;

    if (!nombre_cliente) return ["Missing nombre_cliente parameter"];
    if (!apellido_cliente) return ["Missing apellido_cliente parameter"];
    if (!cedula_cliente) return ["Missing cedula_cliente parameter"];
    if (!edad_cliente) return ["Missing edad_cliente parameter"];
    if (!fecha_nacimiento_cliente)
      return ["Missing fecha_nacimiento_cliente parameter"];
    if (!celular_cliente) return ["Missing celular_cliente parameter"];
    if (!direccion_cliente) return ["Missing direccion_cliente parameter"];

    return [
      undefined,
      new CreateClientDto(
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
