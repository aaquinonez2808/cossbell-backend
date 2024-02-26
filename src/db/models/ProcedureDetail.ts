import { Producto } from "./Product";
import { Procedimiento } from "./Procedure";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class ProcedimientoDetalle extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: "id_procedure_detalle",
  })
  public id!: number;

  @ManyToOne(
    () => Procedimiento,
    (procedimiento) => procedimiento.procedimientosDetalle,
    {
      onDelete: "CASCADE",
    }
  )
  @JoinColumn({ name: "id_procedimiento" })
  public procedimiento!: Procedimiento;

  @ManyToOne(() => Producto, (producto) => producto.procedimientoDetalles, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "id_producto" })
  public producto!: Producto;

  @Column({
    type: "numeric",
    nullable: false,
    name: "cantidad_procedure_detalle",
  })
  public cantidad!: number;
}
