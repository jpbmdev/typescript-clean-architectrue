import { FastifyInstance } from "fastify";
import { fastiflyAdapterRoute } from "./route.adapter";
import { generateMongoController } from "../factory/generateMongoController";

const userController = generateMongoController();

const UserRoutes = async (server: FastifyInstance) => {
  server.get("/:email", fastiflyAdapterRoute(userController, "getUser"));
  server.get("/", fastiflyAdapterRoute(userController, "listUsers"));
  server.post("/", fastiflyAdapterRoute(userController, "insertUser"));
};

export default UserRoutes;
