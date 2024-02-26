import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: "id_user",
  })
  public id?: number;

  @Column({
    name: "name_user",
    nullable: false,
  })
  name!: string;

  @Column({
    unique: true,
    name: "email_user",
    nullable: false,
  })
  email!: string;

  @Column({
    name: "password_user",
    nullable: false,
  })
  password!: string;
}
