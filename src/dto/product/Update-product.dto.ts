export class UpdateProductDto {
  private constructor(
    public id_producto: number,
    public codigo_producto: string,
    public nombre_producto: string,
    public cantidad_producto: number
  ) {}

  get values() {
    const returnObj: { [key: string]: any } = {};

    if (this.codigo_producto) returnObj.codigo = this.codigo_producto;
    if (this.nombre_producto) returnObj.nombre = this.nombre_producto;
    if (this.cantidad_producto) returnObj.cantidad = this.cantidad_producto;

    return returnObj;
  }

  static create(object: { [key: string]: any }): [string?, UpdateProductDto?] {
    const { id_producto, codigo_producto, nombre_producto, cantidad_producto } =
      object;

    if (!id_producto || isNaN(Number(id_producto)))
      return ["Missing id parameter in url path"];

    return [
      undefined,
      new UpdateProductDto(
        id_producto,
        codigo_producto,
        nombre_producto,
        cantidad_producto
      ),
    ];
  }
}
