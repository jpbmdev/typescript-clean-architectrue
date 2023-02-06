import { UserInterface } from "../interfaces/user.interface";
import UserModel from "../models/user.model";

const registerUser = async (user: UserInterface) => {
  const response = await UserModel.create(user);
  return response;
};

const getUser = async (email: string) => {
  const response = await UserModel.findOne({ email });
  return response;
};

export default { registerUser, getUser };
