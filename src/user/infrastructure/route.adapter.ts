import { FastifyReply, FastifyRequest } from "fastify";
import { HttpRequest } from "../../core/interfaces/http.interface";
import UserController from "./user.controller";

export const fastiflyAdapterRoute = (
  controller: UserController,
  method: keyof UserController
) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const httpRequest: HttpRequest = {
      params: request.params,
      body: request.body,
    };

    const httpResponse = await controller[method](httpRequest);
    reply.status(httpResponse.statusCode).send(httpResponse.body);
  };
};
