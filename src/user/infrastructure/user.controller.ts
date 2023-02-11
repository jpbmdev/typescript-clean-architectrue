import {
  HttpRequest,
  HttpResponse,
} from "../../core/interfaces/http.interface";
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
    const { email } = httpRequest.params as { email: string };
    const user = await this.userUseCase.getUserByEmail(email);
    return { statusCode: 200, body: user };
  }

  async listUsers(): Promise<HttpResponse> {
    const users = await this.userUseCase.listUsers();
    return { statusCode: 200, body: users };
  }

  async insertUser(httpRequest: HttpRequest): Promise<HttpResponse> {
    const body = httpRequest.body as AddUserDto;

    const exists = await this.userUseCase.getUserByEmail(body.email);
    if (exists)
      return { statusCode: 400, body: { message: "User Already Exists" } };

    const created = await this.userUseCase.createUser(body);
    return { statusCode: 200, body: created };
  }
}

export default UserController;
