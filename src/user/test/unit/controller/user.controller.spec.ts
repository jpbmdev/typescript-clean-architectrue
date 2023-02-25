import { HttpRequest } from "../../../../core/interfaces/http.interface";
import UserController from "../../../controller/user.controller";
import { UserRepository } from "../../../domain/user.repository";
import { MongoRepository } from "../../../infrastructure/mongo.repositoy";
import { UserService } from "../../../services/user.service";

describe("User Controller", () => {
  let userRepository: UserRepository;
  let userService: UserService;
  let userController: UserController;

  beforeAll(() => {
    userRepository = new MongoRepository();
    userService = new UserService(userRepository);
    userController = new UserController(userService);
  });

  describe("findUserByEmail", () => {
    test("get Successfull User", async () => {
      jest
        .spyOn(userService, "getUserByEmail")
        .mockImplementationOnce(async () => ({
          _id: "0",
          name: "test",
          email: "test@test.com",
          description: "test",
          createdAt: new Date(),
          updatedAt: new Date(),
        }));

      const httpRequest: HttpRequest = {
        params: { email: "test@test.com" },
      };

      const response = await userController.getUser(httpRequest);

      expect(response.statusCode).toBe(200);
      expect(response.body.email).toBe("test@test.com");
    });
  });
});
