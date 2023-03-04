import "dotenv/config";
import { Server } from "./core/server/server";

(async () => {
  const server = new Server();

  await server.initialize();

  server.start();
})();
