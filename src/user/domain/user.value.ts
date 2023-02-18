import { AddUserDto } from "./dto/addUser.dto";
import { UserEntity } from "./user.entity";

export class UserValue implements UserEntity {
  _id: string;
  name: string;
  email: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;

  constructor({ name, email, description }: AddUserDto) {
    this.name = name;
    this.email = email;
    this.description = description;
  }
}
