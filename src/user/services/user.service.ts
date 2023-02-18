import { AddUserDto } from "../domain/dto/addUser.dto";
import { UserEntity } from "../domain/user.entity";
import { UserRepository } from "../domain/user.repository";
import { UserValue } from "../domain/user.value";

export class UserService {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async getUserByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.findUserByEmail(email);
  }

  async listUsers(): Promise<UserEntity[]> {
    return this.userRepository.listUsers();
  }

  async createUser(addUserDto: AddUserDto) {
    const userValue = new UserValue(addUserDto);
    const userCreated = await this.userRepository.createUser(userValue);
    return userCreated;
  }

  async updateUser(userEntity: UserEntity) {
    const userUpdated = await this.userRepository.updateUser(userEntity);
    return userUpdated;
  }

  async deleteUserByEmail(email: string): Promise<void> {
    return this.userRepository.deleteUserByEmail(email);
  }
}
