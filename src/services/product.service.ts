import { CustomError } from "../config/errors/custom.error";
import { Producto } from "../db/models/Product";
import { CreateProductDto } from "../dto/product/Create-product.dto";
import { UpdateProductDto } from "../dto/product/Update-product.dto";
import { PaginationDto } from "../dto/shared/pagination.dto";
import { PaginationEntity } from "../entities/paginationEntity";

export class ProductService {
  public async createProduct(
    createProductDto: CreateProductDto
  ): Promise<Producto> {
    const productExists = await Producto.findOne({
      where: { codigo: createProductDto.codigo_producto },
    });

    if (productExists) throw CustomError.badRequest("Product already exists");

    try {
      const newProduct = {
        codigo: createProductDto.codigo_producto,
        nombre: createProductDto.nombre_producto,
        cantidad: createProductDto.cantidad_producto,
      };

      const product = Producto.create({ ...newProduct });
      await product.save();
      return product;
    } catch (error) {
      throw CustomError.internal(` ${error}`);
    }
  }

  public async getProducts(
    paginationDto: PaginationDto
  ): Promise<PaginationEntity<Producto>> {
    const [products, totalProducts] = await Promise.all([
      Producto.find({
        skip: (paginationDto.page - 1) * paginationDto.limit,
        take: paginationDto.limit,
      }),
      Producto.count(),
    ]);

    const data = PaginationEntity.fromPaginationDto({
      datosTotal: totalProducts,
      paginationDto,
      datos: products,
      nombreData: "products",
    });

    return data;
  }

  public async getProduct(id: number): Promise<Producto> {
    const product = await Producto.findOne({ where: { id } });
    if (!product) throw CustomError.notFound("Product not found");
    return product;
  }

  public async deleteProduct(id: number): Promise<Producto> {
    const product = await Producto.findOne({ where: { id } });
    if (!product) throw CustomError.notFound("Product not found");

    await product.remove();
    return product;
  }

  public async updateProduct(
    updateProductDto: UpdateProductDto
  ): Promise<Producto> {
    const product = await Producto.findOne({
      where: { id: updateProductDto.id_producto },
    });

    if (!product) throw CustomError.notFound("Product not found");

    try {
      const updatedProduct = Producto.merge(product, {
        ...updateProductDto.values,
      });
      await updatedProduct.save();
      return updatedProduct;
    } catch (error) {
      throw CustomError.internal(` ${error}`);
    }
  }
}
