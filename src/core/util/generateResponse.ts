import { ValidationError } from "class-validator";
import { HttpResponse } from "../interfaces/http.interface";

export const SuccessResponse = (body: any): HttpResponse => {
  return {
    statusCode: 200,
    body,
  };
};

export const CreatedResponse = (body: any): HttpResponse => {
  return {
    statusCode: 201,
    body,
  };
};

export const BadRequestResponse = (body: ValidationError[]): HttpResponse => {
  return {
    statusCode: 400,
    body,
  };
};

export const UnauthorizedResponse = (message: string): HttpResponse => {
  return {
    statusCode: 401,
    body: { message },
  };
};

export const NotFoundResponse = (message: string): HttpResponse => {
  return {
    statusCode: 404,
    body: { message },
  };
};

export const ConflictResponse = (message: string): HttpResponse => {
  return {
    statusCode: 409,
    body: { message },
  };
};

export const ServerErrorResponse = (message: string): HttpResponse => {
  return {
    statusCode: 500,
    body: { message },
  };
};
