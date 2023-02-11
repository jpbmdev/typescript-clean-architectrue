import { FastifyInstance } from "fastify";
import { UserUseCase } from "../application/user.usecase";
import UserController from "./user.controller";
import { MongoRepository } from "./mongo.repositoy";
import { fastiflyAdapterRoute } from "./route.adapter";

const userRepository = new MongoRepository();

const userUseCases = new UserUseCase(userRepository);

const userController = new UserController(userUseCases);

const UserRoutes = async (server: FastifyInstance) => {
  server.get("/:email", fastiflyAdapterRoute(userController, "getUser"));
  server.get("/", fastiflyAdapterRoute(userController, "listUsers"));
  server.post("/", fastiflyAdapterRoute(userController, "insertUser"));
};

export default UserRoutes;
