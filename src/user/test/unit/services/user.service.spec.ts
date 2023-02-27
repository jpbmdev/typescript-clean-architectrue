import { UserRepository } from "../../../domain/user.repository";
import { UserService } from "../../../services/user.service";
import { MockUserRepository } from "../../mock/user.repository.mock";

describe("User Service", () => {
  let userRepository: UserRepository;
  let userService: UserService;

  beforeAll(() => {
    userRepository = new MockUserRepository();
    userService = new UserService(userRepository);
  });

  test("getUserByEmail", async () => {
    const email = "test@test.com";

    const user = {
      _id: "0",
      name: "test",
      email: "test@test.com",
      description: "test",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest
      .spyOn(userRepository, "findUserByEmail")
      .mockImplementationOnce(async () => user);

    const response = await userService.getUserByEmail(email);

    expect(response).toEqual(user);
  });

  test("listUsers", async () => {
    const users = [
      {
        _id: "0",
        name: "test",
        email: "test@test.com",
        description: "test",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    jest
      .spyOn(userRepository, "listUsers")
      .mockImplementationOnce(async () => users);

    const response = await userService.listUsers();

    expect(response).toEqual(users);
  });

  test("createUser", async () => {
    const addUserDto = {
      name: "test",
      email: "test@test.com",
      description: "test",
    };

    const user = {
      _id: "0",
      name: "test",
      email: "test@test.com",
      description: "test",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest
      .spyOn(userRepository, "createUser")
      .mockImplementationOnce(async () => user);

    const response = await userService.createUser(addUserDto);

    expect(response).toEqual(user);
  });

  test("updateUser", async () => {
    const user = {
      _id: "0",
      name: "test updated",
      email: "test@test.com",
      description: "test updated",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest
      .spyOn(userRepository, "updateUser")
      .mockImplementationOnce(async () => user);

    const response = await userService.updateUser(user);

    expect(response).toEqual(user);
  });
});
