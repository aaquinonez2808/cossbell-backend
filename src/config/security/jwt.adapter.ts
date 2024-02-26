import jwt from "jsonwebtoken";

export class JWTAdapter {
  static async generateToken(
    payload: any,
    duration: string = "2h"
  ): Promise<string | null> {
    console.log(payload);
    return new Promise((resolve) => {
      jwt.sign(
        payload,
        process.env.JWT_SECRET!,
        { expiresIn: duration },
        (err, token) => {
          if (err) resolve(null);
          resolve(token!);
        }
      );
    });
  }
  static verifyToken<T>(token: string): Promise<T | null> {
    return new Promise((resolve) => {
      jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
        if (err) resolve(null);
        resolve(decoded as T);
      });
    });
  }
}
