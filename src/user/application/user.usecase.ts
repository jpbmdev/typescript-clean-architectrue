import { AddUserDto } from "../domain/dto/addUser.dto";
import { UserEntity } from "../domain/user.entity";
import { UserRepository } from "../domain/user.repository";
import { UserValue } from "../domain/user.value";

export class UserUseCase {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async getUserByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.findUserByEmail(email);
  }

  public listUsers(): Promise<UserEntity[]> {
    return this.userRepository.listUsers();
  }

  public async createUser(addUserDto: AddUserDto) {
    const userValue = new UserValue(addUserDto);
    const userCreated = await this.userRepository.createUser(userValue);
    return userCreated;
  }
}
