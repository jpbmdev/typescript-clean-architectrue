import { AddUserDto } from "../../domain/dto/addUser.dto";
import { UserEntity } from "../../domain/user.entity";
import { UserRepository } from "../../domain/user.repository";

export class MockUserRepository implements UserRepository {
  users: UserEntity[] = [
    {
      _id: "0",
      name: "test",
      email: "test@test.com",
      description: "test",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  async findUserByEmail(email: string) {
    const user = this.users.find((u) => u.email === email);
    return user || null;
  }
  async listUsers() {
    return this.users;
  }

  async createUser(addUserDto: AddUserDto) {
    const user: UserEntity = {
      ...addUserDto,
      _id: this.users.length.toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.users.push(user);

    return this.users[0];
  }
  async updateUser(userEntity: UserEntity): Promise<UserEntity | null> {
    let user = this.users.find((u) => u.email === userEntity.email);
    if (!user) return null;
    user = userEntity;
    return user;
  }
  async deleteUserByEmail(email: string) {
    let index = this.users.findIndex((u) => u.email === email);
    if (index === -1) return;
    this.users.splice(index, 1);
  }
}
