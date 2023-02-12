import { FastifyInstance } from "fastify";
import { fastiflyRouteAdapter } from "../factory/fastiflyRouteAdapter";
import { mongoController } from "../factory/mongoController";

const userController = mongoController();

const UserRoutes = async (server: FastifyInstance) => {
  server.get("/:email", fastiflyRouteAdapter(userController, "getUser"));
  server.delete("/:email", fastiflyRouteAdapter(userController, "deleteUser"));
  server.get("/", fastiflyRouteAdapter(userController, "listUsers"));
  server.post("/", fastiflyRouteAdapter(userController, "insertUser"));
};

export default UserRoutes;
