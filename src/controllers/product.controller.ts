import { Request, Response } from "express";
import { ProductService } from "../services/product.service";
import { CreateProductDto } from "../dto/product/Create-product.dto";
import { UpdateProductDto } from "../dto/product/Update-product.dto";
import { ResponseHandler } from "../config/Response";
import { CustomError } from "../config/errors/custom.error";
import { PaginationDto } from "../dto/shared/pagination.dto";

export class ProductController {
  constructor(private readonly productService: ProductService) {}

  createProduct = (req: Request, res: Response) => {
    const [error, createProductDto] = CreateProductDto.create(req.body);
    if (error) return ResponseHandler.sendErrorResponse(res, error);
    this.productService
      .createProduct(createProductDto!)
      .then((product) => {
        ResponseHandler.sendCreatedResponse(
          res,
          product,
          "Product successfully created"
        );
      })
      .catch((error) => {
        ResponseHandler.sendErrorResponse(res, error);
      });
  };

  getProducts = (req: Request, res: Response) => {
    const { limit = 10, page = 1 } = req.query;
    const [error, paginationDto] = PaginationDto.create(+limit, +page);
    if (error) return res.status(400).json({ error: error });
    this.productService
      .getProducts(paginationDto!)
      .then((products) => {
        ResponseHandler.sendSuccessResponse(
          res,
          products,
          "Products retrieved successfully"
        );
      })
      .catch((error) => {
        ResponseHandler.sendErrorResponse(res, error);
      });
  };

  getProduct = (req: Request, res: Response) => {
    const productId = parseInt(req.params.id);
    if (!productId || isNaN(Number(productId)))
      ResponseHandler.sendErrorResponse(
        res,
        CustomError.badRequest("ID IS INVALID")
      );
    this.productService
      .getProduct(productId)
      .then((product) => {
        ResponseHandler.sendSuccessResponse(
          res,
          product,
          "Product retrieved successfully"
        );
      })
      .catch((error) => {
        ResponseHandler.sendErrorResponse(res, error);
      });
  };

  updateProduct = (req: Request, res: Response) => {
    const productId = parseInt(req.params.id);
    const [error, updateProductDto] = UpdateProductDto.create({
      id_producto: productId,
      ...req.body,
    });
    if (error) return ResponseHandler.sendErrorResponse(res, error);

    this.productService
      .updateProduct(updateProductDto!)
      .then((updatedProduct) => {
        ResponseHandler.sendSuccessResponse(
          res,
          updatedProduct,
          "Product updated successfully"
        );
      })
      .catch((error) => {
        ResponseHandler.sendErrorResponse(res, error);
      });
  };

  deleteProduct = (req: Request, res: Response) => {
    const productId = parseInt(req.params.id);
    if (!productId || isNaN(productId))
      return ResponseHandler.sendErrorResponse(
        res,
        CustomError.badRequest("Invalid ID")
      );

    this.productService
      .deleteProduct(productId)
      .then((deletedProduct) => {
        ResponseHandler.sendSuccessResponse(
          res,
          deletedProduct,
          "Product deleted successfully"
        );
      })
      .catch((error) => {
        ResponseHandler.sendErrorResponse(res, error);
      });
  };
}
