import {
  HttpRequest,
  HttpResponse,
} from "../../core/interfaces/http.interface";
import {
  BadRequestResponse,
  CreatedResponse,
  ServerErrorResponse,
  SuccessResponse,
} from "../../core/util/generateResponse";
import { UserUseCase } from "../application/user.usecase";
import { AddUserDto } from "../domain/dto/addUser.dto";

export class UserController {
  private readonly userUseCase;

  constructor(userUseCase: UserUseCase) {
    this.userUseCase = userUseCase;
    //Bind data to make the router work
    this.getUser = this.getUser.bind(this);
    this.listUsers = this.listUsers.bind(this);
    this.insertUser = this.insertUser.bind(this);
  }

  async getUser(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email } = httpRequest.params as { email: string };
      const user = await this.userUseCase.getUserByEmail(email);
      return SuccessResponse(user);
    } catch (error: any) {
      return ServerErrorResponse(error.message);
    }
  }

  async listUsers(): Promise<HttpResponse> {
    try {
      const users = await this.userUseCase.listUsers();
      return SuccessResponse(users);
    } catch (error: any) {
      return ServerErrorResponse(error.message);
    }
  }

  async insertUser(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const body = httpRequest.body as AddUserDto;

      const exists = await this.userUseCase.getUserByEmail(body.email);
      if (exists) return BadRequestResponse("User Already Exists");

      const created = await this.userUseCase.createUser(body);
      return CreatedResponse(created);
    } catch (error: any) {
      return ServerErrorResponse(error.message);
    }
  }
}

export default UserController;
