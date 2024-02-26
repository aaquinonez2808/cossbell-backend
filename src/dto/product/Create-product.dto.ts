export class CreateProductDto {
  private constructor(
    public codigo_producto: string,
    public nombre_producto: string,
    public cantidad_producto: number
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateProductDto?] {
    const { codigo_producto, nombre_producto, cantidad_producto } = object;

    if (!codigo_producto) return ["Missing codigo_producto parameter"];
    if (!nombre_producto) return ["Missing nombre_producto parameter"];
    if (!cantidad_producto) return ["Missing cantidad_producto parameter"];

    return [
      undefined,
      new CreateProductDto(codigo_producto, nombre_producto, cantidad_producto),
    ];
  }
}
