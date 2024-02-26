import { bcryptAdapter } from "../config/security/bcrypt.adapter";
import { User } from "../db/models/User";
import { LoginUserDto } from "../dto/auth/Login-user.dto";
import { CustomError } from "../config/errors/custom.error";
import { JWTAdapter } from "../config/security/jwt.adapter";
import { UserEntity } from "../entities/user.entity";
import { RegisterUserDto } from "../dto/auth/Register-user.dto";

export class UserService {
  public async registerUser(registerUserDTO: RegisterUserDto) {
    const existUser = await User.findOne({
      where: { email: registerUserDTO.email_user },
    });
    if (existUser) throw CustomError.badRequest("User already exist");

    try {
      registerUserDTO.password_user = bcryptAdapter.hash(
        registerUserDTO.password_user
      );
      const userCreate = {
        email: registerUserDTO.email_user,
        password: registerUserDTO.password_user,
        name: registerUserDTO.name_user,
      };
      const newUser = await User.create({ ...userCreate }).save();
      console.log({ newUser });
      const { password_user, ...user } = UserEntity.fromObject(newUser);
      const token = await JWTAdapter.generateToken({
        id: user.id_user,
      });
      if (!token) throw CustomError.badRequest("Error generating token");
      return {
        data: user,
        token: token,
      };
    } catch (error) {
      throw CustomError.internal(` ${error}`);
    }
  }

  public async loginUser(loginUserDTO: LoginUserDto) {
    const existUser = await User.findOne({
      where: { email: loginUserDTO.email_user },
    });

    if (!existUser) throw CustomError.badRequest("User not found");

    if (!bcryptAdapter.compare(loginUserDTO.password_user, existUser.password))
      throw CustomError.badRequest("Password not match");

    const { password_user, ...user } = UserEntity.fromObject(existUser);

    const token = await JWTAdapter.generateToken({
      id: user.id_user,
    });
    if (!token) throw CustomError.internal("Error generating token");

    return {
      data: user,
      token,
    };
  }

  public async validateUser(id: number) {
    const existUser = await User.findOne({
      where: { id: id },
    });
    if (!existUser) throw CustomError.badRequest("User not found");

    const { password_user, ...user } = UserEntity.fromObject(existUser);
    const token = await JWTAdapter.generateToken({
      id: user.id_user,
    });
    if (!token) throw CustomError.internal("Error generating token");
    return {
      data: user,
      token,
    };
  }
}
