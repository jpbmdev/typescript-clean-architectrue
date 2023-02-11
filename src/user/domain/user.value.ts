const { v4: uuidv4 } = require("uuid");
import { AddUserDto } from "./dto/addUser.dto";
import { UserEntity } from "./user.entity";

export class UserValue implements UserEntity {
  id: string;
  name: string;
  email: string;
  description: string;

  constructor({ name, email, description }: AddUserDto) {
    this.id = uuidv4();
    this.name = name;
    this.email = email;
    this.description = description;
  }
}
