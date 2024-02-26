import { DataSource } from "typeorm";
import { User } from "./models/User";
import { Cliente } from "./models/Client";
import { Producto } from "./models/Product";
import { Procedimiento } from "./models/Procedure";
import { ProcedimientoDetalle } from "./models/ProcedureDetail";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "root",
  database: "cossBellDB",
  synchronize: true,
  logging: true,
  entities: [User, Cliente, Producto, Procedimiento, ProcedimientoDetalle],
  subscribers: [],
  migrations: [],
});

export const connection = async () => {
  try {
    await AppDataSource.initialize();
  } catch (error) {
    console.log(error);
  }
};
