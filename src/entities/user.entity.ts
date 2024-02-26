import { CustomError } from "../config/errors/custom.error";

export class UserEntity {
  constructor(
    public id_user: number,
    public email_user: string,
    public password_user: string,
    public name_user: string
  ) {}

  public static fromObject(object: { [key: string]: any }): UserEntity {
    const { id, email, password, name } = object;

    if (!id) throw CustomError.badRequest("Missing id_user parameter");
    if (!name) throw CustomError.badRequest("Missing name_user parameter");

    if (!email) throw CustomError.badRequest("Missing email_user parameter");
    if (!password)
      throw CustomError.badRequest("Missing password_user parameter");

    return new UserEntity(id, email, password, name);
  }
}
