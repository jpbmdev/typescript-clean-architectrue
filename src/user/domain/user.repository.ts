import { UserEntity } from "./user.entity";

export interface UserRepository {
  findUserByEmail(email: string): Promise<UserEntity | null>;
  listUsers(): Promise<UserEntity[]>;
  createUser(userEntity: UserEntity): Promise<UserEntity>;
  updateUser(userEntity: UserEntity): Promise<UserEntity | null>;
  deleteUserByEmail(email: string): Promise<void>;
}
