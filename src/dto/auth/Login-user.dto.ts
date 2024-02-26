export class LoginUserDto {
  private constructor(
    public email_user: string,
    public password_user: string
  ) {}

  static create(object: { [key: string]: any }): [string?, LoginUserDto?] {
    const { email_user, password_user } = object;

    if (!email_user) return ["Missing email_user parameter"];
    if (!password_user) return ["Missing password_user parameter"];
    return [undefined, new LoginUserDto(email_user, password_user)];
  }
}
