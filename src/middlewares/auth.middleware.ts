import { NextFunction, Request, Response } from "express";
import { JWTAdapter } from "../config/security/jwt.adapter";
import { messageError } from "../config/errors/message.error";

export class AuthMiddleware {
  static validateAuthentication(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const authorization = req.header("Authorization");

    if (!authorization) {
      return res.status(401).json({
        ok: false,
        data: null,
        message: null,
        error: messageError.NOT_AUTHENTICATED,
      });
    }

    if (!authorization.includes("Bearer")) {
      return res.status(401).json({
        ok: false,
        data: null,
        message: null,
        error: messageError.NOT_AUTHENTICATED,
      });
    }

    const token = authorization.split(" ")[1] || "";

    JWTAdapter.verifyToken<{
      id: number;
    }>(token)
      .then((payload) => {
        if (!payload) {
          return res.status(401).json({
            ok: false,
            data: null,
            message: null,
            error: messageError.NOT_AUTHENTICATED,
          });
        }
        req.body.id_user = payload.id;
      })
      .catch(() => {
        return res.status(500).json({
          ok: false,
          data: null,
          message: null,
          error: messageError.INTERNAL_SERVER_ERROR,
        });
      });
    next();
  }
}
