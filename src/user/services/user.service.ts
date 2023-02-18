import { AddUserDto } from "../domain/dto/addUser.dto";
import { UserEntity } from "../domain/user.entity";
import { UserRepository } from "../domain/user.repository";

export class UserService {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async getUserByEmail(email: string) {
    return this.userRepository.findUserByEmail(email);
  }

  async listUsers() {
    return this.userRepository.listUsers();
  }

  async createUser(addUserDto: AddUserDto) {
    const userCreated = await this.userRepository.createUser(addUserDto);
    return userCreated;
  }

  async updateUser(userEntity: UserEntity) {
    const userUpdated = await this.userRepository.updateUser(userEntity);
    return userUpdated;
  }

  async deleteUserByEmail(email: string) {
    return this.userRepository.deleteUserByEmail(email);
  }
}
