import { UserEntity } from "../domain/user.entity";
import { UserRepository } from "../domain/user.repository";
import UserModel from "./user.model";

export class MongoRepository implements UserRepository {
  async findUserByEmail(email: string): Promise<UserEntity | null> {
    const user = await UserModel.findOne({ email });
    return user as UserEntity;
  }

  async listUsers(): Promise<UserEntity[]> {
    const users = await UserModel.find();
    return users as UserEntity[];
  }

  async createUser(userEntity: UserEntity): Promise<UserEntity | null> {
    const createdUser = await UserModel.create(userEntity);
    return createdUser as UserEntity;
  }

  async updateUser(userEntity: UserEntity): Promise<UserEntity | null> {
    const updatedUser = await UserModel.findOneAndUpdate(
      { email: userEntity.email },
      userEntity,
      { returnDocument: "after" }
    );
    return updatedUser as UserEntity;
  }

  async deleteUserByEmail(email: string): Promise<void> {
    await UserModel.deleteOne({ email });
  }
}
