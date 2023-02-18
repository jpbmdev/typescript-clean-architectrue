import { FastifyReply, FastifyRequest } from "fastify";
import { HttpRequest } from "../../core/interfaces/http.interface";
import UserController from "../controller/user.controller";

export const fastifyRouteAdapter = (
  controller: UserController,
  method: keyof UserController
) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const httpRequest: HttpRequest = {
        params: request.params,
        body: request.body,
      };

      const httpResponse = await controller[method](httpRequest);
      reply.status(httpResponse.statusCode).send(httpResponse.body);
    } catch (error: any) {
      return reply.status(500).send({ message: error.message });
    }
  };
};
