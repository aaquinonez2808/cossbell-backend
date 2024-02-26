import express from "express";
import "reflect-metadata";
import { connection } from "./db/config";

interface Options {
  port?: number;
  router?: express.Router;
}
export class Server {
  public readonly app: express.Application;
  private readonly port: number;
  private readonly router: express.Router;

  constructor(options: Options) {
    this.app = express();
    this.port = options.port ?? 5000;
    this.router = options.router ?? express.Router();
  }

  async start() {
    // Middlewares
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));

    this.app.use(this.router);

    //Connect to database
    connection().then(() => {
      console.log("Conexion exitosa");
    });

    //Funcion para llenar la base de datos, se ejecuta una sola vez
    //await mainSeed(database, connection);

    this.app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
    });
  }
}
