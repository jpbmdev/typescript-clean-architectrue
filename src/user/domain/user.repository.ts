import { AddUserDto } from "./dto/addUser.dto";
import { UserEntity } from "./user.entity";

export interface UserRepository {
  findUserByEmail(email: string): Promise<UserEntity | null>;
  listUsers(): Promise<UserEntity[]>;
  createUser(addUserDto: AddUserDto): Promise<UserEntity>;
  updateUser(userEntity: UserEntity): Promise<UserEntity | null>;
  deleteUserByEmail(email: string): Promise<void>;
}
