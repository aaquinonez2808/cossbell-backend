import { Router } from "express";
import { UserController } from "../controllers/user.controllers";
import { UserService } from "../services/user.service";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();
    const authService = new UserService();
    const authController = new UserController(authService);
    router.post("/login", authController.loginUser);
    router.post("/register", authController.registerUser);
    router.post(
      "/validate",
      AuthMiddleware.validateAuthentication,
      authController.validateUser
    );

    return router;
  }
}
