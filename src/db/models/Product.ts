import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ProcedimientoDetalle } from "./ProcedureDetail";

@Entity()
export class Producto extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: "id_producto",
  })
  id?: number;

  @Column({
    name: "codigo_producto",
    unique: true,
    nullable: false,
  })
  codigo!: string;

  @Column({
    name: "nombre_producto",
    nullable: false,
  })
  nombre!: string;

  @Column({
    name: "cantidad_producto",
    nullable: false,
  })
  cantidad!: number;

  @OneToMany(
    () => ProcedimientoDetalle,
    (procedimientoDetalle) => procedimientoDetalle.producto
  )
  public procedimientoDetalles?: ProcedimientoDetalle[];
}
