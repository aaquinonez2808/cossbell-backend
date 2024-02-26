import { CustomError } from "../config/errors/custom.error";

export class PaginationEntity<T> {
  constructor(
    public total: number,
    public limit: number,
    public page: number,
    public prevPage: string | null,
    public nextPage: string | null,
    public data: T[]
  ) {}

  public static fromPaginationDto<T>(data: {
    datosTotal: number;
    paginationDto: { limit: number; page: number };
    datos: T[];
    nombreData: string;
  }): PaginationEntity<T> {
    const { datosTotal, paginationDto, datos, nombreData } = data;

    if (!datosTotal)
      throw CustomError.badRequest("Missing customersTotal parameter");

    if (!paginationDto)
      throw CustomError.badRequest("Missing paginationDto parameter");

    const { limit, page } = paginationDto;

    if (!limit || !page)
      throw CustomError.badRequest("Missing limit or page parameter");

    const prevPage =
      page > 1 ? `/api/${nombreData}?limit=${limit}&page=${page - 1}` : null;
    const nextPage =
      page * limit < datosTotal
        ? `/api/${nombreData}?limit=${limit}&page=${page + 1}`
        : null;

    return new PaginationEntity(
      datosTotal,
      limit,
      page,
      prevPage,
      nextPage,
      datos
    );
  }
}
