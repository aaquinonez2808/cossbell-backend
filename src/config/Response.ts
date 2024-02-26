import { Response } from "express";
import { CustomError } from "../config/errors/custom.error";

export class ResponseHandler {
  static sendSuccessResponse(res: Response, data: any, message: string) {
    return res.status(200).json({
      ok: true,
      data: data,
      message: message,
      error: null,
    });
  }

  static sendCreatedResponse(res: Response, data: any, message: string) {
    return res.status(201).json({
      ok: true,
      data: data,
      message: message,
      error: null,
    });
  }

  static sendErrorResponse(res: Response, error: unknown) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({
        ok: false,
        data: null,
        message: null,
        error: error.message,
      });
    } else if (typeof error === "string") {
      return res.status(400).json({
        ok: false,
        data: null,
        message: null,
        error: error,
      });
    }
    return res.status(500).json({
      ok: false,
      data: null,
      message: null,
      error: "Internal server error",
    });
  }
}
