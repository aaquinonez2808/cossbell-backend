export class PaginationDto {
  private constructor(
    public readonly page: number,
    public readonly limit: number
  ) {}

  static create(
    limit: number = 1,
    page: number = 1
  ): [string?, PaginationDto?] {
    if (!page || isNaN(Number(page))) return ["Page must be a number"];
    if (!limit || isNaN(Number(limit))) return ["Limit must be a number"];

    if (page <= 0) return ["Page must be greater than 0"];
    if (limit <= 0) return ["Limit must be greater than 0"];
    return [undefined, new PaginationDto(page, limit)];
  }
}
