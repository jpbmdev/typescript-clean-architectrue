import {
  HttpRequest,
  HttpResponse,
} from "../../core/interfaces/http.interface";
import {
  BadRequestResponse,
  CreatedResponse,
  ErrorInBodyResponse,
  NotFoundResponse,
  SuccessResponse,
} from "../../core/util/generateResponse";
import { UserService } from "../services/user.service";
import { generateAddUserDto } from "../domain/dto/addUser.dto";
import { generateUpdateUserDto } from "../domain/dto/updateUser.dto";

export class UserController {
  private readonly userUseCase;

  constructor(userUseCase: UserService) {
    this.userUseCase = userUseCase;
    //Bind data to make the router work
    this.getUser = this.getUser.bind(this);
    this.listUsers = this.listUsers.bind(this);
    this.insertUser = this.insertUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  async getUser(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { email } = httpRequest.params as { email: string };

    const user = await this.userUseCase.getUserByEmail(email);
    if (!user) return NotFoundResponse("User Not Found");

    return SuccessResponse(user);
  }

  async listUsers(): Promise<HttpResponse> {
    const users = await this.userUseCase.listUsers();
    return SuccessResponse(users);
  }

  async insertUser(httpRequest: HttpRequest): Promise<HttpResponse> {
    const body = httpRequest.body;

    const { addUserDto, errors } = await generateAddUserDto(body);

    if (errors.length) return ErrorInBodyResponse(errors);

    const exists = await this.userUseCase.getUserByEmail(addUserDto.email);
    if (exists) return BadRequestResponse("User Already Exists");

    const created = await this.userUseCase.createUser(addUserDto);
    return CreatedResponse(created);
  }

  async updateUser(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { email } = httpRequest.params as { email: string };

    const body = httpRequest.body;

    const { updateUserDto, errors } = await generateUpdateUserDto(body);

    if (errors.length) return ErrorInBodyResponse(errors);

    const user = await this.userUseCase.getUserByEmail(email);
    if (!user) return NotFoundResponse("User Not Found");

    user.name = updateUserDto.name;
    user.description = updateUserDto.description;

    const updatedUser = await this.userUseCase.updateUser(user);
    return SuccessResponse(updatedUser);
  }

  async deleteUser(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { email } = httpRequest.params as { email: string };

    const exists = await this.userUseCase.getUserByEmail(email);
    if (!exists) return NotFoundResponse("User Not Found");

    await this.userUseCase.deleteUserByEmail(email);
    return SuccessResponse({ message: "User Deleted." });
  }
}

export default UserController;
