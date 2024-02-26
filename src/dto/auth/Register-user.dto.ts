import { regularExps } from "../../config/regular-exp";

export class RegisterUserDto {
  private constructor(
    public email_user: string,
    public password_user: string,
    public name_user: string
  ) {}

  static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
    const { email_user, password_user, name_user } = object;

    if (!email_user) return ["Missing email parameter"];
    if (!name_user) return ["Missing NAME parameter"];
    if (!password_user) return ["Missing password parameter"];
    if (!regularExps.email.test(email_user)) return ["Invalid email format"];
    if (!regularExps.password.test(password_user))
      return ["Invalid password format"];

    return [
      undefined,
      new RegisterUserDto(email_user, password_user, name_user),
    ];
  }
}
