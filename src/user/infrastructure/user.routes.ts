import { FastifyInstance } from "fastify";
import { fastifyRouteAdapter } from "../factory/fastiflyRouteAdapter";
import { mongoController } from "../factory/mongoController";

const userController = mongoController();

const UserRoutes = async (server: FastifyInstance) => {
  server.get("/:email", fastifyRouteAdapter(userController, "getUser"));
  server.put("/:email", fastifyRouteAdapter(userController, "updateUser"));
  server.delete("/:email", fastifyRouteAdapter(userController, "deleteUser"));
  server.get("/", fastifyRouteAdapter(userController, "listUsers"));
  server.post("/", fastifyRouteAdapter(userController, "insertUser"));
};

export default UserRoutes;
