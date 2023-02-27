import {
  HttpRequest,
  HttpResponse,
} from "../../core/interfaces/http.interface";
import {
  ConflictResponse,
  CreatedResponse,
  BadRequestResponse,
  NotFoundResponse,
  SuccessResponse,
} from "../../core/util/generateResponse";
import { UserService } from "../services/user.service";
import { generateAddUserDto } from "../domain/dto/addUser.dto";
import { generateUpdateUserDto } from "../domain/dto/updateUser.dto";

export class UserController {
  private readonly userService;

  constructor(userService: UserService) {
    this.userService = userService;
    //Bind data to make the router work
    this.getUser = this.getUser.bind(this);
    this.listUsers = this.listUsers.bind(this);
    this.insertUser = this.insertUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  async getUser(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { email } = httpRequest.params as { email: string };

    const user = await this.userService.getUserByEmail(email);
    if (!user) return NotFoundResponse("User Not Found");

    return SuccessResponse(user);
  }

  async listUsers(): Promise<HttpResponse> {
    const users = await this.userService.listUsers();
    return SuccessResponse(users);
  }

  async insertUser(httpRequest: HttpRequest): Promise<HttpResponse> {
    const body = httpRequest.body;

    const { addUserDto, errors } = await generateAddUserDto(body);

    if (errors.length) return BadRequestResponse(errors);

    const exists = await this.userService.getUserByEmail(addUserDto.email);
    if (exists) return ConflictResponse("User Already Exists");

    const created = await this.userService.createUser(addUserDto);
    return CreatedResponse(created);
  }

  async updateUser(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { email } = httpRequest.params as { email: string };

    const body = httpRequest.body;

    const { updateUserDto, errors } = await generateUpdateUserDto(body);

    if (errors.length) return BadRequestResponse(errors);

    const user = await this.userService.getUserByEmail(email);
    if (!user) return NotFoundResponse("User Not Found");

    user.name = updateUserDto.name;
    user.description = updateUserDto.description;

    const updatedUser = await this.userService.updateUser(user);
    return SuccessResponse(updatedUser);
  }

  async deleteUser(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { email } = httpRequest.params as { email: string };

    const exists = await this.userService.getUserByEmail(email);
    if (!exists) return NotFoundResponse("User Not Found");

    await this.userService.deleteUserByEmail(email);
    return SuccessResponse({ message: "User Deleted." });
  }
}

export default UserController;
