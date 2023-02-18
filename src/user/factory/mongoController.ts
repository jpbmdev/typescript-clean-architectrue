import { UserService } from "../services/user.service";
import { MongoRepository } from "../infrastructure/mongo.repositoy";
import UserController from "../controller/user.controller";

export const mongoController = (): UserController => {
  const userRepository = new MongoRepository();

  const userService = new UserService(userRepository);

  return new UserController(userService);
};
