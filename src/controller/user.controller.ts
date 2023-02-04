import { FastifyReply, FastifyRequest } from "fastify";
import { UserInterface } from "../interfaces/user.interface";
import UserService from "../services/user.service";

const getUser = async (request: FastifyRequest, reply: FastifyReply) => {
  const { email } = request.params as { email: string };
  const user = await UserService.getUser(email);
  reply.code(200).send(user);
};

const insertUser = async (request: FastifyRequest, reply: FastifyReply) => {
  const body = request.body;
  const created = await UserService.registerUser(body as UserInterface);
  reply.code(201).send(created);
};

export default { getUser, insertUser };
