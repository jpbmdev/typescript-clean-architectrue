import { UserUseCase } from "../application/user.usecase";
import { MongoRepository } from "../infrastructure/mongo.repositoy";
import UserController from "../controller/user.controller";

export const mongoController = (): UserController => {
  const userRepository = new MongoRepository();

  const userUseCases = new UserUseCase(userRepository);

  return new UserController(userUseCases);
};
