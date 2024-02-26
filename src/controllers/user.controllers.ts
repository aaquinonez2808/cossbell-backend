import { Request, Response } from "express";
import { LoginUserDto } from "../dto/auth/Login-user.dto";
import { UserService } from "../services/user.service";
import { RegisterUserDto } from "../dto/auth/Register-user.dto";
import { ResponseHandler } from "../config/Response";

export class UserController {
  constructor(private readonly userService: UserService) {}

  registerUser = (req: Request, res: Response) => {
    console.log(req.body);
    const [error, registerUserDTO] = RegisterUserDto.create(req.body);
    if (error) return ResponseHandler.sendErrorResponse(res, error);

    this.userService
      .registerUser(registerUserDTO!)
      .then((response) =>
        ResponseHandler.sendCreatedResponse(
          res,
          response,
          "User successfully registered"
        )
      )
      .catch((error) => ResponseHandler.sendErrorResponse(res, error));
  };

  loginUser = (req: Request, res: Response) => {
    const { email, password } = req.body;
    const [error, loginUserDto] = LoginUserDto.create({ email, password });
    if (error) return ResponseHandler.sendErrorResponse(res, error);

    this.userService
      .loginUser(loginUserDto!)
      .then((response) =>
        ResponseHandler.sendSuccessResponse(
          res,
          response,
          "User successfully logged in"
        )
      )
      .catch((error: any) => ResponseHandler.sendErrorResponse(res, error));
  };

  validateUser = (req: Request, res: Response) => {
    const id_user: number = req.body;

    if (!id_user)
      return ResponseHandler.sendErrorResponse(res, "Missing user ID");

    this.userService
      .validateUser(id_user)
      .then((response) =>
        ResponseHandler.sendSuccessResponse(
          res,
          response,
          "User successfully validated"
        )
      )
      .catch((error: any) => ResponseHandler.sendErrorResponse(res, error));
  };
}
