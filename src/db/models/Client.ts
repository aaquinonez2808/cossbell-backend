import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Procedimiento } from "./Procedure";

@Entity()
export class Cliente extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: "id_cliente",
  })
  id: number | undefined;

  @Column({
    name: "nombre_cliente",
    nullable: false,
  })
  nombre!: string;

  @Column({
    name: "apellido_cliente",
    nullable: false,
  })
  apellido!: string;

  @Column({
    unique: true,
    name: "cedula_cliente",
    nullable: false,
  })
  cedula!: string;

  @Column({
    name: "edad_cliente",
    nullable: false,
  })
  edad!: number;

  @Column({
    name: "fecha_nacimiento_cliente",
    nullable: false,
    type: "date",
  })
  fechaNacimiento!: Date;

  @Column({
    name: "celular_cliente",
    nullable: false,
  })
  celular!: string;

  @Column({
    name: "direccion_cliente",
    nullable: false,
  })
  direccion!: string;

  @OneToMany(() => Procedimiento, (procedimiento) => procedimiento.cliente)
  public procedimientos?: Procedimiento[];
}
