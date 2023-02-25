import { AddUserDto } from "../domain/dto/addUser.dto";
import { UserEntity } from "../domain/user.entity";
import { UserRepository } from "../domain/user.repository";
import UserModel from "./user.model";

export class MongoRepository implements UserRepository {
  private mapDocumentToEntity(document: any): UserEntity {
    return {
      _id: document._id.toString(),
      name: document.name,
      email: document.email,
      description: document.description,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    };
  }

  private mapDocumentsToEntites(documents: any[]): UserEntity[] {
    return documents.map((document) => ({
      _id: document._id.toString(),
      name: document.name,
      email: document.email,
      description: document.description,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    }));
  }

  async findUserByEmail(email: string) {
    const user = await UserModel.findOne({ email });
    if (!user) return null;
    return this.mapDocumentToEntity(user);
  }

  async listUsers() {
    const users = await UserModel.find();
    return this.mapDocumentsToEntites(users);
  }

  async createUser(addUserDto: AddUserDto) {
    const createdUser = await UserModel.create(addUserDto);
    return this.mapDocumentToEntity(createdUser);
  }

  async updateUser(userEntity: UserEntity) {
    const updatedUser = await UserModel.findOneAndUpdate(
      { email: userEntity.email },
      userEntity,
      { returnDocument: "after" }
    );
    if (!updatedUser) return null;
    return this.mapDocumentToEntity(updatedUser);
  }

  async deleteUserByEmail(email: string) {
    await UserModel.deleteOne({ email });
  }
}
