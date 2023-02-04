import { FastifyInstance } from "fastify";
import UserController from "../controller/user.controller";

const UserRoutes = async (server: FastifyInstance) => {
  server.get("/:email", UserController.getUser);
  server.post("/", UserController.insertUser);
};

export default UserRoutes;
