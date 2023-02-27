import { HttpRequest } from "../../../../core/interfaces/http.interface";
import UserController from "../../../controller/user.controller";
import { UserRepository } from "../../../domain/user.repository";
import { UserService } from "../../../services/user.service";
import { MockUserRepository } from "../../mock/user.repository.mock";

describe("User Controller", () => {
  let userRepository: UserRepository;
  let userService: UserService;
  let userController: UserController;

  beforeAll(() => {
    userRepository = new MockUserRepository();
    userService = new UserService(userRepository);
    userController = new UserController(userService);
  });

  describe("findUserByEmail", () => {
    test("Get successfull user", async () => {
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

    test("User not found", async () => {
      jest
        .spyOn(userService, "getUserByEmail")
        .mockImplementationOnce(async () => null);

      const httpRequest: HttpRequest = {
        params: { email: "test@test.com" },
      };

      const response = await userController.getUser(httpRequest);

      expect(response.statusCode).toBe(404);
    });
  });

  describe("listUsers", () => {
    test("list users successfully", async () => {
      jest.spyOn(userService, "listUsers").mockImplementationOnce(async () => [
        {
          _id: "0",
          name: "test",
          email: "test@test.com",
          description: "test",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);

      const response = await userController.listUsers();

      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBe(1);
    });
  });

  describe("insertUser", () => {
    test("create user successfully", async () => {
      jest
        .spyOn(userService, "getUserByEmail")
        .mockImplementationOnce(async () => null);

      jest
        .spyOn(userService, "createUser")
        .mockImplementationOnce(async () => ({
          _id: "0",
          name: "test",
          email: "test@test.com",
          description: "test",
          createdAt: new Date(),
          updatedAt: new Date(),
        }));

      const addUserDto = {
        name: "test",
        email: "test@test.com",
        description: "test",
      };

      const httpRequest: HttpRequest = {
        body: addUserDto,
      };

      const response = await userController.insertUser(httpRequest);

      expect(response.statusCode).toBe(201);
      expect(response.body._id).toBe("0");
    });

    test("create user body validations", async () => {
      const addUserDto = {};

      const httpRequest: HttpRequest = {
        body: addUserDto,
      };

      const response = await userController.insertUser(httpRequest);

      expect(response.statusCode).toBe(400);
      expect(response.body.length).toBe(3);
    });

    test("create user duplicated user", async () => {
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

      const addUserDto = {
        name: "test",
        email: "test@test.com",
        description: "test",
      };

      const httpRequest: HttpRequest = {
        body: addUserDto,
      };

      const response = await userController.insertUser(httpRequest);

      expect(response.statusCode).toBe(409);
    });
  });

  describe("updateUser", () => {
    test("update user successfully", async () => {
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

      jest
        .spyOn(userService, "updateUser")
        .mockImplementationOnce(async () => ({
          _id: "0",
          name: "test updated",
          email: "test@test.com",
          description: "test updated",
          createdAt: new Date(),
          updatedAt: new Date(),
        }));

      const updateUserDto = {
        name: "test updated",
        description: "test updated",
      };

      const httpRequest: HttpRequest = {
        params: { email: "test@test.com" },
        body: updateUserDto,
      };

      const response = await userController.updateUser(httpRequest);

      expect(response.statusCode).toBe(200);
      expect(response.body.name).toBe("test updated");
      expect(response.body.description).toBe("test updated");
    });

    test("update user body validations", async () => {
      const updateUserDto = {};

      const httpRequest: HttpRequest = {
        params: { email: "test@test.com" },
        body: updateUserDto,
      };

      const response = await userController.updateUser(httpRequest);

      expect(response.statusCode).toBe(400);
      expect(response.body.length).toBe(2);
    });

    test("update user, user not found", async () => {
      jest
        .spyOn(userService, "getUserByEmail")
        .mockImplementationOnce(async () => null);

      const updateUserDto = {
        name: "test updated",
        description: "test updated",
      };

      const httpRequest: HttpRequest = {
        params: { email: "test@test.com" },
        body: updateUserDto,
      };

      const response = await userController.updateUser(httpRequest);

      expect(response.statusCode).toBe(404);
    });
  });

  describe("deleteUser", () => {
    test("delete user succesfuly", async () => {
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

      const response = await userController.deleteUser(httpRequest);

      expect(response.statusCode).toBe(200);
    });

    test("delete user, user not found", async () => {
      jest
        .spyOn(userService, "getUserByEmail")
        .mockImplementationOnce(async () => null);

      const httpRequest: HttpRequest = {
        params: { email: "test@test.com" },
      };

      const response = await userController.deleteUser(httpRequest);

      expect(response.statusCode).toBe(404);
    });
  });
});
