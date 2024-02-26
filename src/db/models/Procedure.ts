import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Cliente } from "./Client";
import { ProcedimientoDetalle } from "./ProcedureDetail";

@Entity()
export class Procedimiento extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: "id_procedimiento",
  })
  public id?: number;

  @ManyToOne((type) => Cliente, (cliente) => cliente.procedimientos, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "id_cliente" })
  public cliente!: Cliente;

  @OneToMany(
    () => ProcedimientoDetalle,
    (procedureDetalle) => procedureDetalle.procedimiento
  )
  public procedimientosDetalle?: ProcedimientoDetalle[];

  @Column({
    name: "fecha_procedimiento",
    nullable: false,
    type: "date",
  })
  fecha!: Date;

  @Column({
    name: "descripcion_procedimiento",
    nullable: false,
  })
  public descripcion!: string;

  @Column({
    name: "indiciaciones_procedimiento",
    nullable: false,
  })
  public indicaciones!: string;

  @Column({
    name: "precio_procedimiento",
    nullable: false,
    type: "numeric",
  })
  public precio!: number;
}
