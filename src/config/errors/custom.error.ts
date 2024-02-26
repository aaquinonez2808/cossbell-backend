export class CustomError extends Error {
  constructor(
    public readonly message: string,
    public readonly statusCode: number
  ) {
    super(message);
  }

  static badRequest(message: string) {
    return new CustomError(message, 400);
  }

  static unauthorized(message: string) {
    return new CustomError(message, 401);
  }

  static notFound(message: string) {
    return new CustomError(message, 404);
  }
  static forbidden(message: string) {
    return new CustomError(message, 403);
  }

  static internal(message: string) {
    console.log(message);
    return new CustomError(message, 500);
  }
}
