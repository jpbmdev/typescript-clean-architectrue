import "dotenv/config";
import serverlessExpress from "@vendia/serverless-express";

import { Server } from "./core/server/server";

let serverlessExpressInstance: any;

const setup = async (event: any, context: any) => {
  const server = new Server();
  await server.initialize();
  serverlessExpressInstance = serverlessExpress({ app: server.server });
  return serverlessExpressInstance(event, context);
};

export const handler = (event: any, context: any) => {
  if (serverlessExpressInstance)
    return serverlessExpressInstance(event, context);

  return setup(event, context);
};
