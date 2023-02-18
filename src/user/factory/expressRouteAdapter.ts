import { Request, Response } from "express";
import { HttpRequest } from "../../core/interfaces/http.interface";
import UserController from "../controller/user.controller";

export const expressRouteAdapter = (
  controller: UserController,
  method: keyof UserController
) => {
  return async (request: Request, response: Response) => {
    try {
      const httpRequest: HttpRequest = {
        params: request.params,
        body: request.body,
      };

      const httpResponse = await controller[method](httpRequest);
      response.status(httpResponse.statusCode).send(httpResponse.body);
    } catch (error: any) {
      return response.status(500).send({ message: error.message });
    }
  };
};
