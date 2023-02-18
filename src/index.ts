import "dotenv/config";
import { Server } from "./core/server/server";

const server = new Server();

server.start();
