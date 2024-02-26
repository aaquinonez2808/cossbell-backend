import { config } from "dotenv";
import { Server } from "./Server";
import { AppRoutes } from "./routes/index.routes";

config();

(async () => {
  main();
})();

function main() {
  const server = new Server({
    port: process.env.PORT ? Number(process.env.PORT) : undefined,
    router: AppRoutes.routes,
  });

  server.start();
}
